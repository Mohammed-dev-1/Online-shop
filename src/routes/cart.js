const { page, product, drop } = require('../controllers/CartController');
const { isAuthorize } = require('../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/', isAuthorize, page);
router.post('/:id', isAuthorize, product);
router.post('/remove/:id', isAuthorize, drop);

module.exports = router;