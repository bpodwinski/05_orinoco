const Currency = require("../models/Currency");
const axios = require("axios");

/* If "order" key exists in localstorage retrieves the datas
 * else creates an empty table by default
 */
exports.orderSchema = () => {
  let orderData = {};
  if (localStorage.getItem("order") != undefined) {
    orderData = JSON.parse(localStorage.getItem("order"));
  }
  return orderData;
};

/* Get order via Axios json reponse
 * and push the datas in localstorage key "order"
 */
exports.createOrder = async (order) => {
  await axios
    .post("http://orinoco.benoitpodwinski.com/api/cameras/order", order)
    .then(function (res) {
      let productsPrice = res.data.products;
      for (let i = 0; i < productsPrice.length; i++) {
        if (productsPrice[i].price) {
          productsPrice[i].price = Currency.currencyFormat(
            productsPrice[i].price
          );
        }
      }
      return localStorage.setItem("order", JSON.stringify(res.data));
    });
};
