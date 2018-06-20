/* STEP 0: 
    Terminal-Work: npm install
    Install all packages you need and which are still missing
/* STEP 1: RETRIEVE AND STORE ALL NEEDED PACKAGES */
/* This is the ENTRANCE in your SERVER COMMUNICATION */
require('dotenv').config();

/* MIDDLEWARE Body Parser is used to catch the data {body} send with the POST method */
const bodyParser   = require('body-parser');
/* MIDDLEWARE Cookie Parser */
const cookieParser = require('cookie-parser');
/* EXPRESS is the BACKEND FRAMEWORK */
const express      = require('express');
/* hbs is a Library, which can be used to mix html and js by using {{}} */
const hbs          = require('hbs');
/* Moongoose is the OPM (Object Document Mapper) for the database MongoDB
   Mongoose translates the data from MongoDB documents to JS objects */
const mongoose     = require('mongoose');
const logger       = require('morgan');
/* Path provides an easier way of working with directories and file paths*/
const path         = require('path');
{auth_requires}


/* STEP 2: OPEN A CONNECTION TO OUR DATABASE */
mongoose.Promise = Promise;
/* Opening a connection to your database with the name "app_name" <-- This name is exchangable */
mongoose
  .connect('mongodb://localhost/{app_name}', {useMongoClient: true})
  .then(() => {
    console.log('Database Connection is opened!')
  }).catch(err => {
    console.error('Error connecting to your database', err)
  });

/* STEP 3: SET UP OF OUR BACKEND FRAMEWORK */
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Store my BACKEND Framework in a variable
const app = express();

/* STEP 4: SET UP OF THE USED MIDDLEWARE */
// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Register hbs-Partials, if you use Partials
hbs.registerPartials(__dirname + '/views/partials');

/* STEP 5: SET UP OF THE VIEW ENGINE --> This is the point I tell my program where to find my views and images and to use hbs (handlebars) */
// Express View engine setup
{expressCss}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

{auth_hbs_helper}

// default value for title local
app.locals.title = 'Express - Generated with ElGenerator';

{auth}


/* STEP 6: SETTING UP THE ROUTES */
const index = require('./routes/index');
app.use('/', index);
{auth_routes}

// Making the information included in this file accessable for my other project modules
module.exports = app;

/* STEP 7: CONTINUE BY CREATING A SCHEMA --> Go to MODELS-Folder !!! */