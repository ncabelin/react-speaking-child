const Validator = require('validator');
const isEmpty = require('./is-empty');

Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};

module.exports = function validateRegisterInput(data) {
  let errors = {};
  ['name','email','password','password2'].forEach(function(elem) {
    data[elem] = !isEmpty(data[elem]) ? data[elem] : '';
  });

  if (!Validator.isLength(data.childname, {min:2,max:30})) {
    errors.childname = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.childname)) {
    errors.childname = 'Name field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!Validator.isLength(data.password, {min:6,max:30})) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match!';
  }

  const d = data.birthday.split('/');
  const year = d[2],
        month = d[0],
        day = d[1];
  const birthDate = new Date(`${year}/${month}/${day}`);
  if (!birthDate.isValid()) {
    errors.birthday = 'Invalid birthdate';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
