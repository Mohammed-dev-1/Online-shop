const { page, drop, create, update, details } = require('../controllers/ProductController');
const { isAuthorize } = require('../util/middleware/auth.middleware');
const { editMode } = require('../util/middleware/product.middleware');
const { ProductRequestValidation } = require('../Requests/ProductRequest');

const express = require('express');
const router = express.Router();

router.get('/', isAuthorize, editMode, page);
router.get('/:id', details);
router.put('/', isAuthorize, ProductRequestValidation(), editMode, update);
router.post('/', isAuthorize, ProductRequestValidation(), create);
router.delete('/', isAuthorize, drop);

module.exports = router;