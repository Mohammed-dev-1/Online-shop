const { page, drop, create, details } = require('../controllers/ProductController');
const { isAuthorize } = require('../util/middleware/auth.middleware');
const { editMode } = require('../util/middleware/product.middleware');
const { ProductRequestValidation } = require('../Requests/ProductRequest');

const express = require('express');
const router = express.Router();

router.get('/', isAuthorize, editMode, page);
router.get('/:id', details);
router.post('/', isAuthorize, ProductRequestValidation(), editMode, create);
router.delete('/', isAuthorize, drop);

module.exports = router;