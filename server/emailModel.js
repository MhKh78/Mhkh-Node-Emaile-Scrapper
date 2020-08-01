const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'email must have an address'],
    unique: [true, 'email  address must be unique'],
  },
  timesEmailed: {
    type: Number,
    default: 0,
  },
  timesRedirected: {
    type: Number,
    default: 0,
  },
  key: {
    type: String,
    unique: [true, 'email  key must be unique'],

    default: Math.random().toString(36).substring(7),
  },
});

const Email = mongoose.model('Email', EmailSchema);

module.exports = Email;
