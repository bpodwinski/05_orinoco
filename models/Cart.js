/* If "cart" key exists in localstorage retrieves the datas
 * else creates an empty table by default
 */
exports.cartSchema = () => {
  let cart = [];
  if (localStorage.getItem("cart") != undefined) {
    return (cart = JSON.parse(localStorage.getItem("cart")));
  }
  return cart;
};

/* Check if function argument is an array
 * and push the datas in localstorage
 */
exports.pushToCart = (data) => {
  if (Array.isArray(data)) {
    return localStorage.setItem("cart", JSON.stringify(data));
  }
};

/* Calculate the total price of cart
 * if empty creates a table by default
 */
exports.cartTotalPrice = () => {
  const cart = require("../models/Cart");
  let cartData = cart.cartSchema();
  let cartTotalPrice = [];

  if (cartData.length !== 0) {
    let sum = (accumulator, currentValue) => accumulator + currentValue;

    for (let i = 0; i < cartData.length; i++) {
      cartTotalPrice.push(parseInt(cartData[i].price));
    }

    return (cartTotalPrice = cartTotalPrice.reduce(sum));
  }
  return cartTotalPrice;
};
