/* STEP 1: Including mongoose as an OPM (Object Document Mapper) for the database MongoDB
   Mongoose translates the data from MongoDB documents to JS objects */
const mongoose = require('mongoose');

/* STEP 2: Creating a Schema, which is a mongoose schema, so that mongoose can translate them into MongoDB document and MongoDB documents to JS objects */ 
const Schema   = mongoose.Schema;

/* STEP 3: Defining a Schema, which acts like a class for my objects */
const userSchema = new Schema({
  username: String,
  password: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

/* STEP 4: Storing our Schema in a variable to make it easily accessable in our project */
const User = mongoose.model('User', userSchema);

/* STEP 5: Exporting our Schema stored in our variable accessable in our project */
module.exports = User;

/* STEP 6: SEED YOUR DATABASE, if necessary. Go to bin/seeds.js!! */
