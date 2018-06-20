// STEP 1: Store all necessary modules in variables
// Retrieve my Backend Framework
const express = require("express");
// Retrieving my LOGIN handle
const passport = require('passport');
  // Bcrypt to encrypt passwords
    const bcrypt = require("bcrypt");
    const bcryptSalt = 10;
    const ensureLogin = require("connect-ensure-login");

// STEP 2: Defining my router
const authRoutes = express.Router();
// STEP 3: Importing my used DB-Model
const User = require("../models/User");


// STEP 4: Create a route for a LOGIN
// Start with a GET-Method to display a form to the user to enable the user to insert his/her user data
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

// Retrieve the User data with a POST-Method and check with the middleware 'passport.authenticate' (retrievable through the passport-module), if the User is signed up to our page
authRoutes.post("/login", passport.authenticate("local", {
  // if the LOGIN was sucessfull redirect to this route
  successRedirect: "/",
  // if the LOGIN was not sucessfull redirect to this route       
  failureRedirect: "/auth/login",
  // if an error occured use connec
  failureFlash: true,
  passReqToCallback: true
}));

// STEP 5: Create a route to SIGNUP
// Start with a GET-Method to display a form to the user to enable the user to insert his/her user data
// Example: A middleware which checks for the Users role
function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/')
    }
  }
}

// Creating functions that will check against different roles automatically
const checkPos1  = checkRoles('POS1');
const checkPos2  = checkRoles('POS2');
const checkPos3  = checkRoles('POS3');

// Replace the SIGNUP route
authRoutes.get('/signup', checkPos, (req, res) => {
  res.render('signup', {user: req.user});
});

// Retrieve the User data with a POST-Method and catch the input with the Body-Parser middleware 
authRoutes.post("/signup", (req, res, next) => {
  // Store the input Body-Parser cached
  const username = req.body.username;
  const password = req.body.password;
  const rol = req.body.role;
  // Control, if there was an Input, if not give the User a feedback
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }
// If there was an input, find the Object in my DB and check it
  User.findOne({ username }, "username", (err, user) => {
    // Is the User already signed up?
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
    // If the User isn't already signed up, hash the inserted password
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    // Make a new User Object with the given parameter following the DB model Schema
    const newUser = new User({
      username,
      password: hashPass,
      role:"teacher"
    });
    // Save the new object as a new document
    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

// STEP 6: Route to LOGOUT the user
authRoutes.get("/logout", ensureLogin.ensureLoggedIn(), (req, res) => {
  req.logout();
  res.redirect("/")
});

// STEP 7: Make this module accessable in my Project
module.exports = authRoutes;

// Additional things...create middleware to check the roles of your users
// This middleware must be placed above the route, where it is used to be accessable when using the route

