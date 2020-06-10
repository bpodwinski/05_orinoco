if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
const cart = require("../models/Cart");

if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

exports.removeToCart = (req, res, next) => {
  let cartData = cart.cartSchema();
  let data = {
    id: req.body.product_id,
    name: req.body.product_name,
    img: req.body.product_img,
    price: parseInt(req.body.product_price),
    qty: parseInt(req.body.product_qty),
  };

  // If the cart exist
  if (cartData != undefined) {
    // If the product is already in cart then remove the product
    let itemIndex = cartData.findIndex((el) => el.id == data.id);

    if (itemIndex > -1) {
      cartData.splice(itemIndex, 1);
    }
  }

  // Push the cart to localstorage
  cart.pushToCart(cartData);

  // If cart empty then remove ther localstorage key "cart"
  if (cart.length === 0) {
    localStorage.removeItem("cart");
  }

  return res.redirect("/panier");
};
