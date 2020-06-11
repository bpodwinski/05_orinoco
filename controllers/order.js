const order = require("../models/Order");
const { check, validationResult } = require("express-validator");

exports.checkForm = [
  check("firstName")
    .not()
    .isEmpty()
    .withMessage("Votre prénom est requis")
    .bail()
    .not()
    .matches(/[!@#$%^&*(),.?'":;{}<>²`~\/\[\]\|_+-=]$/, "g")
    .withMessage("Votre prénom comporte des caractères non autorisés")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Votre nom doit comporter entre 3 et 30 caractères"),
  check("lastName")
    .not()
    .isEmpty()
    .withMessage("Votre nom est requis")
    .bail()
    .not()
    .matches(/[!@#$%^&*(),.?'":;{}<>²`~\/\[\]\|_+-=]$/, "g")
    .withMessage("Votre nom comporte des caractères non autorisés")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Votre prénom doit comporter entre 3 et 30 caractères"),
  check("address")
    .not()
    .isEmpty()
    .withMessage("Votre adresse est requise")
    .bail()
    .not()
    .matches(/[!@#$%^&*(),.?'":;{}<>²`~\/\[\]\|_+-=]$/, "g")
    .withMessage("Votre adresse comporte des caractères non autorisés")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Votre adresse doit comporter entre 3 et 30 caractères"),
  check("city")
    .not()
    .isEmpty()
    .withMessage("Votre ville est requise")
    .bail()
    .not()
    .matches(/[!@#$%^&*(),.?'":;{}<>²`~\/\[\]\|_+-=]$/, "g")
    .withMessage("Votre ville comporte des caractères non autorisés")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Votre ville doit comporter entre 3 et 30 caractères"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Votre email est requise")
    .bail()
    .isEmail()
    .normalizeEmail()
    .withMessage("Votre email n'est pas valide"),
];

exports.orderProcess = async (req, res, next) => {
  const formErrors = validationResult(req);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let address = req.body.address;
  let city = req.body.city;
  let email = req.body.email;
  let productsId = [];

  // If form error
  if (!formErrors.isEmpty()) {
    let errors = formErrors.array();
    req.session.success = false;
    req.session.errors = errors;

    console.log("Form errors:");
    console.log(req.session.errors);

    Object.values(errors).forEach(function (error) {
      switch (error.param) {
        case "firstName":
          req.session.firstNameError = error.msg;
          break;
        case "lastName":
          req.session.lastNameError = error.msg;
          break;
        case "address":
          req.session.addressError = error.msg;
          break;
        case "city":
          req.session.cityError = error.msg;
          break;
        case "email":
          req.session.emailError = error.msg;
          break;
      }
    });

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
