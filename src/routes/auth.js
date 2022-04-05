const {
  login, 
  logout,
  register,
  loginPage, 
  registerPage 
} = require('../controllers/Auth/AuthController');

const { isNotAuthorize, isAuthorize } = require('../util/middleware/auth.middleware');
const AuthRequestValidation = require('../Requests/AuthRequest');

const express = require('express');
const router = express.Router();

router.get('/register', isNotAuthorize, registerPage);
router.get('/login', isNotAuthorize, loginPage);

router.post('/register', isNotAuthorize, AuthRequestValidation(), register);
router.post('/login', isNotAuthorize, AuthRequestValidation(), login);
router.post('/logout', isAuthorize, logout);

module.exports = router;