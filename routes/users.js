const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');

// Login Page
//router.get('/login', (req, res) => res.render('login'));

// Register Page
//router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register' , (req, res) => {
  const { forename, surname, username, email, password} = req.body;
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
  }});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',//'/dashboard',
    failureRedirect: '/',//users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/'); //users/login');
});

module.exports = router;
