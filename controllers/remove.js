const path = require("path");
const fs = require("fs");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

exports.removeToCart = (req, res, next) => {
  let data = {
    id: req.body.product_id,
    name: req.body.product_name,
    img: req.body.product_img,
    price: req.body.product_price,
    qty: req.body.product_qty,
  };
  let cart = [];

  if (localStorage.getItem("cart") != undefined) {
    cart = JSON.parse(localStorage.getItem("cart"));
    let itemIndex = cart.findIndex((el) => el.id == data.id);

    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
    } else {
      cart.push(data);
    }
  } else {
    cart.push(data);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  if (cart.length === 0) {
    localStorage.removeItem("cart");
  }

  return res.redirect("/panier");
};
