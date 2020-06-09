const axios = require("axios");
const path = require("path");
const fs = require("fs");

exports.cart = (req, res, next) => {
  cart = "";
  let totalPrice = [];

  if (localStorage.getItem("cart") != undefined) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  if (cart.length === 0) {
    localStorage.removeItem("cart");
  }

  for (let i = 0; i < cart.length; i++) {
    totalPrice.push(parseInt(cart[i].price));
  }

  let sum = (accumulator, currentValue) => accumulator + currentValue;
  totalPrice = totalPrice.reduce(sum);

  res.render("../views/cart", {
    title: "Panier - Orinoco",
    data: cart,
    totalPrice: totalPrice,
    success: req.session.success,
    errors: req.session.errors,
  });
  req.session.destroy();
};
