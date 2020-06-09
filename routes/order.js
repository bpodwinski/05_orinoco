const express = require("express");
const router = express.Router();

const orderCtrl = require("../controllers/order");

router.post("/order", orderCtrl.checkForm, orderCtrl.orderConfirm);
router.get("/order", orderCtrl.orderConfirmed);

module.exports = router;
