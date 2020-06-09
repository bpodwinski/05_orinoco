const axios = require("axios");
const path = require("path");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

exports.checkForm = [
  check("firstName").not().isEmpty().withMessage("Votre prénom est requis"),
  check("lastName").not().isEmpty().withMessage("Votre nom est requis"),
  check("address").not().isEmpty().withMessage("Votre adresse est requise"),
  check("city").not().isEmpty().withMessage("Votre ville est requise"),
  check("email").isEmail().withMessage("Votre email n'est pas valide"),
];

exports.orderConfirm = async (req, res, next) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let address = req.body.address;
  let city = req.body.city;
  let email = req.body.email;
  let productsId = [];
  let post;
  const errors = validationResult(req);

  if (localStorage.getItem("cart") != undefined) {
    cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
      productsId.push(cart[i].id);
    }
  }

  let order = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: productsId,
  };

  if (!errors.isEmpty()) {
    req.session.errors = errors.array();
    req.session.success = false;

    return res.redirect("/panier");
  } else {
    req.session.success = true;

    post = await axios
      .post("http://orinoco.benoitpodwinski.com/api/cameras/order", order)
      .then(function (res) {
        localStorage.setItem("order", JSON.stringify(res.data));
      });
  }
  res.redirect("/order");
};

exports.orderConfirmed = async (req, res, next) => {
  orderData = JSON.parse(localStorage.getItem("order"));
  orderProducts = orderData.products;

  res.render("../views/order", {
    orderData: orderData,
    orderProducts: orderProducts,
  });
};
