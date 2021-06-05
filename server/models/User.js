const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: { type: String, unique: true, required: true }
  /*,
  firstName: { type: String},
  lastName: { type: String},
  city: { type: String},
  country: { type: String},
  about: { type: String},
  birthday:{ type: Date}*/
});

module.exports = mongoose.model('User', schema);
