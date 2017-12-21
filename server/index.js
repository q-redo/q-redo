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
                profile.picture
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

let you = []
app.get("/login", passport.authenticate("auth0"), function(req, res, next) {
  you = req.user
  res.redirect("http://localhost:3000/student")
})

const sharedsession = require("express-socket.io-session")

app.use(session) // ATTACH SESSION
// console.log("initial", session) //Session exists at this point
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
  .then(dbInstance => app.set("db", dbInstance) && dbInstance.log_them_out())
  .catch(console.log)

//SOCKET.IO STARTS

let interval
io.sockets.on("connection", socket => {
  var db = app.get("db")
  socket.handshake.session.user = you
  console.log("Client connected!")
  
  socket.handshake.session.user.user_id ? db.run(`UPDATE users SET logged_in = true WHERE user_id =${socket.handshake.session.user.user_id}`) : console.log("No one signed in")

  var intervalId = setInterval(() => getInfoAndEmit(socket), 5000)
  socket.on("disconnect", () => {
  console.log(socket.handshake.session.user.user_id)
  console.log("Client disconnected!")

  socket.handshake.session.user.user_id ?  db.run(`UPDATE users SET logged_in = false WHERE user_id =${socket.handshake.session.user.user_id}`) : console.log("No user signed in!") })})
  

const getInfoAndEmit = async socket => {
  console.log("yay someone is connected still")
  var db = app.get("db")
  try {
    const userres = await db.run(`SELECT * FROM users WHERE logged_in = true AND rank = 3;`)
    const mentorres = await db.run(`select * FROM users WHERE logged_in = true AND rank = 2`)
    const res = await db.run(`SELECT * FROM questions`)
  
    socket.emit("MentorList", mentorres)
    socket.emit("UserList", userres)
    socket.emit("FromMe", socket.handshake.session.user)
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

app.post("/api/questions", controller.postQuestion)

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
app.put("/api/questions/:id", controller.answeredQuestion)
app.put('/api/waiting_type/:id', controller.updateWaitingType)

app.get("/api/users", controller.getActiveUsers)
app.get("/api/mentors", controller.getActiveMentors)
app.get("/api/recentQuestions", controller.getRecentQuestions)
app.get("/api/activeQuestions", controller.getActiveQuestions)
app.get("/api/topics", controller.getTopics)

app.get("/api/me", function(req, res) {
  if (!req.user) {
    return res.status(404)
  }
  res.status(200).json(req.user)
})

server.listen(port, () => console.log(`Listening on port ${port}`))
