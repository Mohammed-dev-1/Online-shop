const { body } = require('express-validator');

const validate = require('../util/request-body-handling/requestBodyValidation');
const { userExistValidation, userLoginValidation } = require('../util/request-body-handling/userAuthValidation');

const RegisterRequestValidation = _=> validate([
  body('username')
    .isLength({min: 4, max: 15})
    .withMessage('Username must be between 4 and 15 char.'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email.')
    .custom(userExistValidation),
  body('password')
    .isLength({min: 6, max: 12})
    .withMessage('Password must be between 6 and 12 char.')
]);

const LoginRequestValidation = _ => validate([
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email.')
    .custom(userLoginValidation),
  body('password')
    .isLength({ min: 6, max: 12 })
    .withMessage('Password must be between 6 and 12 char.')
]);

module.exports = {
  LoginRequestValidation,
  RegisterRequestValidation
};