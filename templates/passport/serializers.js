
/* There are three important Steps to setup Passport
    1. STEP: SET UP A LOCAL STRATEGY TO HANDLE THE LOGIN
    2. STEP: SERIALIZE THE USER
    3. STEP: DESERIALIZE THE USER

THIS IS THE SECOND AND THIRD STEP: SERIALIZE AND DESERIALIZE THE USER*/

// STEP 1: Include all modules you need for a login-in Strategy for PASSPORT
// The module itself
const passport = require('passport');
  
// The User model as an access to our MongoDB database 
const User = require('../models/User');

// STEP 2: Defining the Serialization of the User
passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

// STEP 3: Defining the Deserialization of the User
passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }

    cb(null, userDocument);
  });
});

//STEP 4: Last step is to INITIALIZE PASSPORT, go to index.js and INITIALIZE PASSPORT