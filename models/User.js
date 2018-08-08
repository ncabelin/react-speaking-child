const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  childname: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  words: [
    {
      word:  {
        type: String,
        required: true
      },
      sound:  {
        type: String,
        required: true
      },
      date_entered:  {
        type: Date,
        required: true
      }
    }
  ],
  phrases: [
    {
      phrase:  {
        type: String,
        required: true
      },
      sound:  {
        type: String,
        required: true
      },
      date_entered:  {
        type: Date,
        required: true
      }
    }
  ]
});

module.exports = User = mongoose.model('users',UserSchema);
