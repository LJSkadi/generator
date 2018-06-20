// INITIALIZE PASSPORT
// STEP 1: Store all necessary modules in variables
// Retrieve my Backend Framework
const express = require("express");
// Set my router
const router  = express.Router();

/* GET home page */
/* Frontdoor or Entrance to your HOMEPAGE */
router.get('/', (req, res, next) => {
  res.render('index');
});

// Make this Entrancepoint accesable in my Project
module.exports = router;

// Now it's time to set up the ROUTES. Go to authRouter.js to start to handle your routes.