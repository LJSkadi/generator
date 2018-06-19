/* There are three important Steps to setup Passport
    1. STEP: SET UP A LOCAL STRATEGY TO HANDLE THE LOGIN
    2. STEP: SERIALIZE THE USER
    3. STEP: DESERIALIZE THE USER

THIS IS THE FIRST STEP: SET UP A LOCAL STRATEGY TO HANDLE THE LOGIN
   This file explains how the module Passport handles and controll logins */

// STEP 1: Include all modules you need for a login-in Strategy for PASSPORT
// The module itself
const passport = require('passport');

  // A variable, which acts like a Strategy Constructor
  const LocalStrategy = require('passport-local').Strategy;
  // bcyrypt package to translate the input password comparable to the stored one 
  const bcrypt        = require('bcrypt');
  // The User model as an access to our MongoDB database 
  const User          = require('../models/User');

// STEP 2: Defining the LocalStrategy
passport.use(new LocalStrategy((username, password, next) => {
  // Find a User with the name the user inserted in the login-form
  User.findOne({ username }, (err, foundUser) => {
    // If an error occurs, go to the next
    if (err) {
      next(err);
      return;
    }
    // If the User is not found, give a feedback to the User
    if (!foundUser) {
      next(null, false, { message: 'Incorrect username' });
      return;
    }
    // If the inserted Password doesn't correspond to the stored Password in the User-DB inform the User
    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password' });
      return;
    }
    // If the User is found and the Passwords correspond, allow access and go to the next
    next(null, foundUser);
  });
}));

// STEP 3: Go to the next STEP SERIALIZING the User in serializers.js