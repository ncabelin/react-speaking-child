const Validator = require('validator');
const isEmpty = require('./is-empty');

Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};

module.exports = function validateWordInput(data) {
  let errors = {};
  ['phrase','sound'].forEach(function(elem) {
    data[elem] = !isEmpty(data[elem]) ? data[elem] : '';
  });

  if (data.date_entered) {
    const d = data.date_entered.split('/');
    const year = d[2],
          month = d[0],
          day = d[1];
    const createdDate = new Date(`${year}/${month}/${day}`);
    if (!createdDate.isValid()) {
      errors.date_entered = 'Invalid date entered';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
