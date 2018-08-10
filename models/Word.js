const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
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

module.exports = Word = mongoose.model('words', WordSchema);
