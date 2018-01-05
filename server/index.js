// install this: npm i axios express socket.io
// install this: npm i socket.io-client
const express = require("express")
const { json } = require("body-parser")
const cors = require("cors")
// const session = require("express-session")
const massive = require("massive")
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")
const connectionString = require("../config.js").massive
const { secret } = require("../config.js").session
const { domain, clientID, clientSecret } = require("../config").auth0
const http = require("http")
const socketIo = require("socket.io")
const axios = require("axios")
const port = process.env.PORT || 3001

// const io = socketIo(server) // < Interesting!
const controller = require("./controller/controller")

var app = require("express")(),
server = require("http").createServer(app),
io = require("socket.io")(server),
session = require("express-session")({
  secret: secret,
  resave: true,
  saveUninitialized: true
})

app.use(session) // ATTACH SESSION
// console.log("initial", session) //Session exists at this point

//Auth0

app.use(passport.initialize())
app.use(passport.session())
// console.log("passport sesh", passport.session()) //session object is still intact up to this point
passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      console.log("PROFILE", profile._json.email)
      app
        .get("db")
        .getUserByAuthId([profile.id])
        .then(response => {
          if (!response[0]) {
            const db = app.get("db")
            db
              .createUserByAuth([
                profile.id,
                profile.displayName,
                profile.picture,
                profile._json.email
              ])
              .then(created => {
                return done(null, created[0])
              })
          } else {
            return done(null, response[0])
          }
        })
    }
  )
)

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj)
})

let you
app.get("/login", passport.authenticate("auth0"), function(req, res, next) {
  you = req.user
  req.session.user = req.user
  req.user.rank === 3
    ? res.redirect("http://localhost:3000/student")
    : res.redirect("http://localhost:3000/mentorview")
})

const sharedsession = require("express-socket.io-session")


io.use(
  //SHARE SESSION WITH IO SOCKETS
  sharedsession(session, {
    autoSave: true
  })
)
const index = require("./../routes/index")
app.use(index)

app.use(json())
app.use(cors())

massive(connectionString)
  .then(dbInstance => app.set("db", dbInstance) & dbInstance.log_them_out())
  .catch(console.log)

//SOCKET.IO STARTS

let interval

io.sockets.on("connection", socket => {
  var db = app.get("db")
  socket.handshake.session.user = you
  you = null;
  console.log(you)
  console.log("Client connected!")

  socket.handshake.session.user
    ? db.run(
        `UPDATE users SET logged_in = true WHERE user_id =${
          socket.handshake.session.user.user_id
        }`
      )
    : console.log("No one signed in")

  var intervalId = setInterval(
    () => getInfoAndEmit(socket, socket.handshake.session.user),
    5000
  )
  socket.on("disconnect", () => {
    console.log("Client disconnected!")
    clearInterval(intervalId)

    socket.handshake.session.user?

    db.run(
      `UPDATE users SET logged_in = false WHERE user_id =${
        socket.handshake.session.user.user_id
      }`
    ) &
    db.run(`UPDATE users
    set waiting_type = 'none'
    where user_id = ${socket.handshake.session.user.user_id}`) &
    db.run(`DELETE FROM questions WHERE user_id = ${socket.handshake.session.user.user_id} AND answered = true `)
    &
    console.log(socket.handshake.session.user.user_id) &
    delete socket.handshake.session.user & breakSession()
    // console.log("this one is after the delete",socket.handshake.session.user.user_id)
    :null
  })
})

const breakSession = function() {
  if(session.user.rank === 3){
delete session.user
  }
}

const getInfoAndEmit = async (socket, usr) => {
  console.log("User still connected")
  var db = app.get("db")
  try {
    const userres = await db.run(
      `SELECT * FROM users WHERE logged_in = true AND rank = 3 AND cohort_id = ${
        usr.cohort_id
      } AND campus_id = ${usr.campus_id}`
    )
    const mentorres = await db.run(
      `select * FROM users WHERE logged_in = true AND rank = 2 AND cohort_id = ${
        usr.cohort_id
      } AND campus_id = ${usr.campus_id}`
    )
    const res = await db.run(
      `SELECT * FROM questions WHERE cohort_id = ${
        usr.cohort_id
      } AND campus_id = ${usr.campus_id}`
    )
    const currentUser = await db.run(
      `SELECT * FROM users WHERE user_id = ${usr.user_id}`
    )

    socket.emit("MentorList", mentorres)
    socket.emit("UserList", userres)
    socket.emit("FromMe", currentUser)
    socket.emit("FromAPI", res) // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}
app.get("/api/questions", (req, res, next) => {
  req.app
    .get("db")
    .get_all_questions()
    .then(response => res.json(response))
})

//SOCKET.io ENDS

///////////////// I DELETED SOME ENDPOINTS FOR THE ABOVE SOCKET.IO TO WORK//////////
//Endpoints

app.get("/api/archived/questions", controller.getArchivedQuestions)
app.post("/api/questions", controller.postQuestion)
app.get("/api/questions/:id", controller.getQuestionById)

app.get("/api/users/:id", (req, res, next) => {
  const dbInstance = req.app.get("db")
  dbInstance
    .getUserByAuthId([req.params.id])
    .then(user => {
      res.status(200).json(user)
    })
    .catch(console.log)
})
//change answer to true //
app.delete("/api/questions/:id", controller.deleteQuestion)
app.delete("/api/help/:id", controller.clearHelp)

app.put("/api/questions/:id", controller.answeredQuestion)
app.put('/api/waiting_type/:id', controller.updateWaitingType)
app.put('/api/users/:id', controller.linkUsers)
app.put('/api/unlink/:id', controller.unlinkUsers)
app.put('/api/inactive/question/:id', controller.inactiveQuestion)

app.get("/api/users", controller.getActiveUsers)
app.get("/api/mentors", controller.getActiveMentors)
app.get("/api/recentQuestions", controller.getRecentQuestions)
app.get("/api/activeQuestions", controller.getActiveQuestions)
app.get("/api/topics", controller.getTopics)

app.post("/api/answers", controller.postAnswer)
app.get("/api/answers/:id", controller.getAnswers)

app.put("/api/verify/answers/:id", controller.toggleVerify)
app.put("/api/upvote/answers/:id", controller.upvote)
app.put("/api/downvote/answers/:id", controller.downvote)

//AdminView Endpoints//
app.post("/api/studentsearch", controller.searchForStudent)
app.put("/api/changeuserrank", controller.changeRank)
app.get("/api/getcampusandcohort", controller.getCandC)
app.put("/api/changeusercohort", controller.changeCohort)
app.put("/api/changeusercampus", controller.changeCampus)
app.post("/api/createcampus", controller.campusCreation)
app.post("/api/createcohort", controller.cohortCreation)
app.get("/api/archiveallquestions", controller.archiveAllQuestions)
app.post("/api/searchSpecificQuestions", controller.getSpecificQuestions)
//End of AdminView endpoints.

//USER CHANGES VIEWS - REMOVES ACTIVE QUESTIONS
app.put("/api/removequestions", controller.helpRemover)

app.get("/api/me", function(req, res) {
  console.log(session.user)
  if (!session.user) {
    return res.status(404).send("no_user");
  }
  res.status(200).json(session.user)
  res.status(408).send("no_user");
})


server.listen(port, () => console.log(`Listening on port ${port}`))