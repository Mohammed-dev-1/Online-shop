const AuthController = require('../controllers/Auth/AuthController');

const { isNotAuthorize, isAuthorize } = require('../util/middleware/auth.middleware');
const { 
  LoginRequestValidation, 
  RegisterRequestValidation, 
  ResetPasswordValidation, 
  ResetPasswordConfirmationValidation 
} = require('../Requests/AuthRequest');

const express = require('express');
const router = express.Router();

router.get('/register', isNotAuthorize, AuthController.registerPage);
router.get('/login', isNotAuthorize, AuthController.loginPage);
router.get('/reset', isNotAuthorize, AuthController.resetPasswordPage);
router.get('/reset/:token', isNotAuthorize, AuthController.resetPasswordWithTokenPage);

router.post('/register', isNotAuthorize, RegisterRequestValidation(), AuthController.register);
router.post('/login', isNotAuthorize, LoginRequestValidation(), AuthController.login);
router.post('/reset', ResetPasswordValidation(), AuthController.resetPassword);
router.post('/reset-confirmation', ResetPasswordConfirmationValidation(), AuthController.resetPasswordConfirmation);
router.post('/logout', isAuthorize, AuthController.logout);

module.exports = router;