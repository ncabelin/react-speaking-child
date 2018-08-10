const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhraseSchema = new Schema({
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
});

module.exports = Phrase = mongoose.model('phrases', PhraseSchema);
