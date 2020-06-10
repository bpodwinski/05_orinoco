const cart = require("../models/Cart");

exports.cart = (req, res, next) => {
  res.render("../views/cart", {
    title: "Panier - Orinoco",
    cartData: cart.cartSchema(),
    cartTotalPrice: cart.cartTotalPrice(),
    success: req.session.success,
    errors: req.session.errors,
  });
  req.session.destroy();
};
