const express = require('express');
const router = express.Router();

const addCtrl = require('../controllers/add');

router.post('/ajouter/:id', addCtrl.addToCart);

module.exports = router;