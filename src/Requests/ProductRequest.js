const { body, check } = require('express-validator');
const { imageTypeValidation } = require('../util/request-body-handling/imageTypeValidation');

const validate = require('../util/request-body-handling/requestBodyValidation');

exports.ProductRequestValidation = _=> validate([
  body('title')
    .notEmpty()
    .withMessage('Title should not be empty.')
    .isLength({max: 30})
    .withMessage('The title can not be more than 30 char.'),
  body('price')
    .notEmpty()
    .withMessage('Price should not be empty.')
    .isNumeric()
    .withMessage('Price should be a numeric type.'),
  body('description')
    .notEmpty()
    .withMessage('Description should not be empty.')
    .isLength({max:150})
    .withMessage('The Description can not be more than 150 char.'),
  body('image')
    .custom(imageTypeValidation)
]);