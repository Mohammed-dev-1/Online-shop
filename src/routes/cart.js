const { page, add, drop } = require('../controllers/CartController');
const { isAuthorize } = require('../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/', isAuthorize, page);
router.post('/:id', isAuthorize, add);
router.post('/remove/:id', isAuthorize, drop);

module.exports = router;