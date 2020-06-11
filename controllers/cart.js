const cart = require("../models/Cart");

exports.cart = (req, res, next) => {
  res.render("../views/cart", {
    title: "Panier - Orinoco",
    cartData: cart.cartSchema(),
    cartTotalPrice: cart.cartTotalPrice(),
    success: req.session.success,
    errors: req.session.errors,
    firstNameError: req.session.firstNameError,
    lastNameError: req.session.lastNameError,
    addressError: req.session.addressError,
    cityError: req.session.cityError,
    emailError: req.session.emailError,
  });
  req.session.destroy();
};
