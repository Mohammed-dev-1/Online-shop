const { body } = require('express-validator');
const { 
  userExistValidation, 
  userLoginValidation, 
  userNotExistValidation, 
  userTokenValidation 
} = require('../util/request-body-handling/userAuthValidation');
const validate = require('../util/request-body-handling/requestBodyValidation');

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

const ResetPasswordValidation = _ => validate([
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email.')
    .custom(userNotExistValidation)
])

const ResetPasswordConfirmationValidation = _ => validate([
  body('password')
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .withMessage('Password must be between 6 and 12 char.')
    .custom((value, { req, location, path }) => {
      return value != req.body.passwordConfirmation ? 
        Promise.reject('Password must be confirmed.') : true;
    }),
  body('token')
    .notEmpty()
    .withMessage('Invalid token.')
    .custom(userTokenValidation)
])

module.exports = {
  LoginRequestValidation,
  RegisterRequestValidation,
  ResetPasswordValidation,
  ResetPasswordConfirmationValidation
};