const express = require("express");
const router = express.Router();

const orderCtrl = require("../controllers/order");

router.post("/order", orderCtrl.checkForm, orderCtrl.orderProcess);
router.get("/order", orderCtrl.orderConfirm);

module.exports = router;
