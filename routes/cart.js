const express = require('express');
const router = express.Router();

const cartCtrl = require('../controllers/cart');

router.get('/panier', cartCtrl.cart);

module.exports = router;