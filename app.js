const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

app.use('/cssFiles', express.static(__dirname + '/assets/css'))
app.use('/jsFiles', express.static(__dirname + '/assets/js'))
app.use('/vidFiles', express.static(__dirname + '/videos'))
app.use('/imgFiles', express.static(__dirname + '/images'))
app.use('/ejsFiles', express.static(__dirname + '/views'))
app.use('/users/imgFiles', express.static(__dirname + '/images'))


// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());


// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg_login = req.flash('error_msg_login');
  res.locals.error_msg_register = req.flash('error_msg_register');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const User = require('./models/user');

app.get('/people', function (req, res) {
  User.find({}, { '_id': 0, 'username': 1, 'forename': 1, 'surname': 1 }, function (err, docs) {
    res.send(docs);
  });
});

app.get('/people/:username', function (req, res) {
  var us = req.params.username;
  User.findOne({ 'username': us }, { '_id': 0, 'username': 1, 'forename': 1, 'surname': 1 }, function (err, docs) {
    res.send(docs);
  });
});
app.post('/people', (req, res) => {
  const { access_token, forename, surname, username, email, password } = req.body;
  //let errors = [];
  if (access_token != 'concertina') {
    res.send(403);
  } else {
    User.findOne({ username: username }).then(user => {
      if (user) {
        res.send(400);
      }
    })
  }
});
module.exports = app; 
