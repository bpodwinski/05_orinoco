if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
const cart = require("../models/Cart");

exports.addToCart = (req, res, next) => {
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
    // If the product is already in cart then increment the quantity
    let itemIndex = cartData.findIndex((el) => el.id == data.id);

    if (itemIndex > -1) {
      let qty = parseInt(cartData[itemIndex].qty);
      qty += parseInt(data.qty);
      cartData[itemIndex].qty = qty;

      // If product doesn't exist in cart then we add it
    } else {
      cartData.push(data);
    }
  }

  // Push the cart to localstorage
  cart.pushToCart(cartData);

  return res.redirect("/panier");
};
