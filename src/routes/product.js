const { page, drop, create, details } = require('../controllers/ProductController');
const { isAuthorize } = require('../util/middleware/auth.middleware');
const { ProductRequestValidation } = require('../Requests/ProductRequest');

const express = require('express');
const router = express.Router();

router.get('/', isAuthorize, page);
router.get('/:id', details);
router.post('/', isAuthorize, ProductRequestValidation(), create);
router.delete('/', isAuthorize, drop);

module.exports = router;