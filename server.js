// Speaking Child

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const words = require('./routes/api/words');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/words', words);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Speaking Child Server running on port ${port}`));
