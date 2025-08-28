const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  accessCode: {
    type: String,
    required: true
  },
  catalogUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Client', clientSchema);