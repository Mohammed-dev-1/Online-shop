const { page, add, getInvoice } = require('../controllers/OrderController');
const { isAuthorize } = require('../util/middleware/auth.middleware');
const { isAccess, productExist } = require('../util/middleware/order.middleware');

const express = require('express');
const router = express.Router();

router.get('/', isAuthorize, page);
router.get('/:id/invoice', isAuthorize, productExist, isAccess, getInvoice);
router.post('/', isAuthorize, add);

module.exports = router;