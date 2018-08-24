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

// @route   POST api/word
// @desc    Create word
// @access  Private
router.post('/', passport.authenticate('jwt', {session:false}), (req,res) => {
  const { errors, isValid } = validateWordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newWord = new Word({
    user: {
      id: req.user.id
    },
    word: req.body.word,
    sound: req.body.sound
  });

  newWord.save().then(word => res.json(word));
});

// @route   PUT api/word/:id
// @desc    Update word
// @access  Private
router.put('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  const { errors, isValid } = validateWordInput(req.body);
  Word.findOneAndUpdate(
    { _id:req.params.id,'user.id':req.user.id },
    { $set: {
        word: req.body.word,
        sound: req.body.sound
      }
    },
    { new: true }
  )
    .then(word => {
      res.json(word);
    })
    .catch(err => res.status(404).json({nowordfound: 'Unable to update word'}));
  });

module.exports = router;
