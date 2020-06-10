const order = require("../models/Order");
const { check, validationResult } = require("express-validator");

exports.checkForm = [
  check("firstName").not().isEmpty().withMessage("Votre prénom est requis"),
  check("lastName").not().isEmpty().withMessage("Votre nom est requis"),
  check("address").not().isEmpty().withMessage("Votre adresse est requise"),
  check("city").not().isEmpty().withMessage("Votre ville est requise"),
  check("email").isEmail().withMessage("Votre email n'est pas valide"),
];

exports.orderProcess = async (req, res, next) => {
  const errors = validationResult(req);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let address = req.body.address;
  let city = req.body.city;
  let email = req.body.email;
  let productsId = [];

  // If form error
  if (!errors.isEmpty()) {
    req.session.success = false;
    req.session.errors = errors.array();

    return res.redirect("/panier");
  }

  if (localStorage.getItem("cart") != undefined) {
    cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
      productsId.push(cart[i].id);
    }
  }

  let orderData = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: productsId,
  };

  req.session.success = true;

  await order.createOrder(orderData);

  return res.redirect("/order");
};

exports.orderConfirm = async (req, res, next) => {
  localStorage.removeItem("cart");

  res.render("../views/order", {
    orderData: order.orderSchema(),
    orderProducts: order.orderSchema().products,
  });
};
