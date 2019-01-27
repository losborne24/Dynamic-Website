const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

app.use('/cssFiles', express.static(__dirname + '/assets/bootstrap-4.1.3-dist/css'))
app.use('/jsFiles', express.static(__dirname + '/assets/bootstrap-4.1.3-dist/js'))
app.use('/vidFiles', express.static(__dirname + '/videos'))
app.use('/imgFiles', express.static(__dirname + '/images'))
app.use('/ejsFiles', express.static(__dirname + '/views'))
//app.use('/ejs.js', express.static(__dirname + '/assets/ejs.js'))
//app.use('/ejs.js', express.static(__dirname + '/node_modules/ejs/ejs.js'))
//app.use('/ejs-file-loader.js', express.static(__dirname + '/node_modules/ejs-file-loader/index.js'))

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
app.use(function(req, res, next) {
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

app.get('/people', function(req, res) {
  User.find({}, { '_id': 0, 'username' :1, 'forename': 1, 'surname': 1}, function (err, docs) {
     res.send(docs);
  });
});

app.get('/people/:username', function(req,res){
  var us = req.params.username;
  User.findOne({'username': us}, { '_id': 0, 'username' :1, 'forename': 1, 'surname': 1}, function (err, docs) {
     res.send(docs);
  });
});
app.post('/people' , (req, res) => {
  const {access_token, forename, surname, username, email, password} = req.body;
  //let errors = [];
  if (!access_token){
    res.send(403);
  }else {
    User.findOne({ username: username }).then(user => {
      if (user) {
        res.send(400);
      }
    })
  }
});

/*const { ensureAuthenticated } = require('./config/auth');
app.post('/people' , ensureAuthenticated, (req, res) => {
  console.log("here");
});*/
/*app.post('',function(req,res) {
  const t = req.body.title;

  // body...
})*/


//const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
/*router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {    user: req.user  })
);*/ 
/*app.post('/people' , (req, res) => {
  

  const { forename, surname, username, email, password } = req.body;
  //let errors = [];

  if (!forename || !surname || !username || !email || !password) {
    //errors.push({ msg: 'Please enter all fields' });
    req.flash('error_msg_register', 'Please enter all fields');
    res.redirect('/'); //users/login');
  }else if (password.length < 6) {
    req.flash('error_msg_register',  'Password must be at least 6 characters' );
    res.redirect('/'); //users/login');
  }else {
    User.findOne({ username: username }).then(user => {
    if (user) {
      req.flash('error_msg_register', 'Username already exists' ); 
      res.redirect('/');
    }else{
       const newUser = new User({
          forename,
          surname,
          username,
          email,
          password
        });
       bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash('success_msg','You are now registered and can log in');
               res.redirect('/');// res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      };
    });
  }});*/

/*

app.get('/people2', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);  
  });
});*/

module.exports = app; 
