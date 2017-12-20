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
let userList = []
passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      console.log('auth0 profile', profile.id);
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
                userList.push(created[0])
                return done(null, created[0])
              })
          } else {
            userList.push(response[0])
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
  .then(dbInstance => app.set("db", dbInstance))
  .catch(console.log)

//SOCKET.IO STARTS

let interval
io.sockets.on("connection", socket => {
  const user = you
  socket.handshake.session.user = user
  console.log("New client connected")
  var intervalId = setInterval(() => getInfoAndEmit(socket), 5000)
  socket.on("disconnect", () => {
    console.log(socket.handshake.session.user)
    console.log("Client disconnected")
    userList.map((usr, i) => {
      usr.name === socket.handshake.session.user.name
        ? userList.splice(i, 1) && console.log(usr.name, "removed")
        : "Unable to find user to remove"
    })
    clearInterval(intervalId)
  })
})

const getInfoAndEmit = async(socket) => {
  console.log("yay", userList)
  try {
    const res = await axios.get("http://localhost:3001/api/questions")
    socket.emit("UserList", userList)
    socket.emit("FromMe", socket.handshake.session.user)
    socket.emit("FromAPI", res.data) // Emitting a new message. It will be consumed by the client
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


app.post('/api/questions', controller.postQuestion);

app.get('/api/users/:id', (req, res, next) => {
  const dbInstance = req.app.get('db');
  dbInstance
    .getUserByAuthId([req.params.id])
    .then(user => {
      res.status(200).json(user);
    })
    .catch(console.log);
});
//change answer to true //
app.put('/api/questions/:id', controller.answeredQuestion);

app.get('/api/users', controller.getActiveUsers);
app.get('/api/mentors', controller.getActiveMentors);
app.get('/api/recentQuestions', controller.getRecentQuestions);
app.get('/api/activeQuestions', controller.getActiveQuestions);
app.get('/api/topics', controller.getTopics);

app.get('/api/me', function(req, res) {
  if (!req.user) {
    return res.status(404);
  }
  res.status(200).json(req.user);
});



server.listen(port, () => console.log(`Listening on port ${port}`))
