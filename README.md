# Speaking Child v2.0
A MERN stack application for monitoring a child's speech via words and phrases tracking.

## Database
```
USERS
  _id
  childname - String, Required
  birthdate - Date, Required
  date - DateNow
  email - String, Required
  password - String, Required

WORDS
  _id
  word
  sound
  date_entered

PHRASES
  _id
  phrase
  sound
  date_entered
```

## License
MIT
