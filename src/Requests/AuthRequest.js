const { body } = require('express-validator');
const validate = require('../util/request-body-handling/requestBodyValidation');

const AuthRequestValidation = _=> validate([
  body('email').isEmail().withMessage('This is not a valid email.'),
  body('password').isLength({min: 6, max: 12}).withMessage('Password must be between 6 and 12 char.')
]);

module.exports = AuthRequestValidation;