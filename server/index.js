const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const connectionString = require('../config.js').massive;
const { secret } = require('../config.js').session;
const { domain, clientID, clientSecret } = require('../config').auth0;

const controller = require('./controller/controller');

const port = 3001;
const app = express();

massive(connectionString)
  .then(dbInstance => app.set('db', dbInstance))
  .catch(console.log);

//Middlewares
app.use(json());
app.use(cors());
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
  })
);

//Auth0
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: '/login'
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      app
        .get('db')
        .getUserByAuthId([profile.id])
        .then(response => {
          if (!response[0]) {
            const db = app.get('db');
            db
              .createUserByAuth([profile.id, profile.displayName, profile.picture])
              .then(created => {
                return done(null, created[0]);
              });
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get(
  '/login',
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/'
  })
);

//Endpoints
app.get('/api/questions', (req, res, next) => {
  const dbInstance = req.app.get('db');
  dbInstance
    .get_all_questions()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(console.log);
});

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

app.get('/api/users', controller.getActiveUsers);
app.get('/api/mentors', controller.getActiveMentors);
app.get('/api/recentQuestions', controller.getRecentQuestions);
app.get('/api/activeQuestions', controller.getActiveQuestions);

app.get('/api/me', function(req, res) {
  if (!req.user) {
    return res.status(404);
  }
  res.status(200).json(req.user);
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
