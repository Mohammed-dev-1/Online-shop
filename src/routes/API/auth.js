const { register, login } = require('../../controllers/Auth/AuthController');
const { isAuthorize, isNotAuthorize } = require('../../util/middleware/auth.middleware');
const AuthRequestValidation = require('../../Requests/AuthRequest');

const express = require('express');
const router = express();

router.post('/register', AuthRequestValidation(), 
  (req, res, next) => {
    res.json({
      ...req.body
    });
});

module.exports = router;