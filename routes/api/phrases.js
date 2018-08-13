const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validatePhraseInput = require('../../validation/phrase');

const User = require('../../models/User');
const Phrase = require('../../models/Phrase');

// @route   GET api/phrase
// @desc    Get phrases
// @access  Private
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  const errors = {};
  Phrase.find({'user.id': req.user.id})
    .then(phrase => {
      res.json(phrase);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/phrase/:id
// @desc    Read phrase
// @access  Private
router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Phrase.findById(req.params.id)
    .then(phrase => {
      if (phrase.user == req.user.id) {
        return res.json(phrase);
      }
      res.status(404).json({notauthorized: 'Not authorized to get this phrase'});
    })
    .catch(err => res.status(404).json({nophrasefound: 'Phrase not found'}));
  });

// @route   POST api/phrase
// @desc    Create phrase
// @access  Private
router.post('/', passport.authenticate('jwt', {session:false}), (req,res) => {
  const { errors, isValid } = validatePhraseInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPhrase = new Phrase({
    user: {
      id: req.user.id
    },
    word: req.body.phrase,
    sound: req.body.sound
  });

  newPhrase.save().then(phrase => res.json(phrase));
});

// @route   PUT api/phrase/:id
// @desc    Update phrase
// @access  Private
router.put('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  const { errors, isValid } = validatePhraseInput(req.body);
  Phrase.findOneAndUpdate(
    { _id:req.params.id,'user.id':req.user.id },
    { $set: {
        phrase: req.body.phrase,
        sound: req.body.sound
      }
    },
    { new: true }
  )
    .then(phrase => {
      res.json(phrase);
    })
    .catch(err => res.status(404).json({nophrasefound: 'Unable to update phrase'}));
  });

module.exports = router;
