const { page, drop, create, update, details } = require('../controllers/ProductController');
const { isAuthorize } = require('../util/middleware/auth.middleware');
const { adminOption } = require('../util/middleware/product.middleware');
const { ProductRequestValidation } = require('../Requests/ProductRequest');

const express = require('express');
const router = express.Router();

router.get('/add', isAuthorize, adminOption, page);
router.get('/:id', details);
router.put('/', isAuthorize, ProductRequestValidation(), adminOption, update);
router.post('/', isAuthorize, ProductRequestValidation(), create);
router.delete('/', isAuthorize, adminOption, drop);

module.exports = router;