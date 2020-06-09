const express = require("express");
const router = express.Router();

const addCtrl = require("../controllers/remove");

router.post("/remove", addCtrl.removeToCart);

module.exports = router;
