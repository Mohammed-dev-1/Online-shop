const { body } = require('express-validator');
const validate = require('../util/request-body-handling/requestBodyValidation');

const sameUserValidation = _=> validate([]);