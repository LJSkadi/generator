// INITIALIZE PASSPORT
// STEP 1: Include all modules you need for a login-in Strategy for PASSPORT
// The module itself
const passport = require('passport');

// STEP 2: Include the Steps you did before
// STEP 2a: Include your local Strategy to handle your User LOGIN
require('./localStrategy');
// STEP 2b: Include 
require('./serializers');


//
module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
}
