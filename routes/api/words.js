const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateWordInput = require('../../validation/word');

const User = require('../../models/User');
const Word = require('../../models/Word');

// @route   GET api/words
// @desc    Get words
// @access  Private
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  const errors = {};
  Word.find({'user.id': req.user.id})
    .then(words => {
      // if (words.length == 0) {
      //   errors.nowords = 'There are no words yet';
      //   return res.status(404).json(errors);
      // }
      res.json(words);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/word/:id
// @desc    Read word
// @access  Private
router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Word.findById(req.params.id)
    .then(word => {
      if (word.user == req.user.id) {
        return res.json(word);
      }
      res.status(404).json({notauthorized: 'Not authorized to get this word'});
    })
    .catch(err => res.status(404).json({nowordfound: 'Word not found'}));
  });

// @route   POST api/words
// @desc    Create word
// @access  Private
router.post('/', passport.authenticate('jwt', {session:false}), (req,res) => {
  const { errors, isValid } = validateWordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(req.user.id);
  const newWord = new Word({
    user: {
      id: req.user.id
    },
    word: req.body.word,
    sound: req.body.sound,
    date_entered: req.body.date_entered
  });

  newWord.save().then(word => res.json(word));
});

module.exports = router;
