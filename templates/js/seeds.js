/* STEP 0: MOVE THIS FILE TO THE bin-FOLDER
/* STEP 1: INCLUDE ALL INFORMATION; WHICH IS NEEDED TO CREATE A DOCUMENT */
// Include the OPM for translating your JS-Seeds to MongoDB documents
const mongoose = require('mongoose');
    // Include the where to find the SCHEMA for the seeds
    const User = require('../models/user');

// Include the module PASSPORT
const passport = require("passport");
    // Include Bcrypt to de- and encrypt passwords
    const bcrypt = require("bcrypt");
        // Set the bcryptSalt rounds
        const bcryptSalt = 10;

// If I want to create a USER DATABASE and want to seed it, it makes sense to create passwords, which are already in the form a normal password would have
// This means it must be hashed
// Creating a standard password
const pw = "password";
// Generating a salt
const salt = bcrypt.genSaltSync(bcryptSalt);
// Hashing the password
const hashPass = bcrypt.hashSync(pw, salt);

// STEP 2: Connecting to my MongoDB database to seed it with documents, which are translated from the objects in our next step 
const dbName = 'app_name';
mongoose.connect(`mongodb://localhost/${dbName}`);

// STEP 3: 

// Including a JS-object and saving it by translating into an MongoDB document manually
const newUser = new User({username: "newUser", password:hashPass, role: "GUEST"});
newUser.save()
    .then(user => {
        console.log(`New User: ${newUser} entered the system`)
        mongoose.connection.close()
    })
    .catch(err => {
        console.log(`Welcome to the dark Side!`)
        mongoose.connection.close()
    });

// STEP 4: Continue with Setting up your HBS-files first (Go to the VIEW-Folder: Start with the layout.hbs) and then define your routes (Go to the ROUTE-Folder)