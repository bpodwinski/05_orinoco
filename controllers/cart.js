const axios = require("axios");
const path = require("path");
const fs = require("fs");

exports.cart = (req, res, next) => {
  let title = "Panier - Orinoco";

  fs.readFile(
    path.resolve(__dirname, "../var/carts/cart_" + req.session.id + ".json"),
    (err, file) => {
      if (err) {
        console.log(err);
      } else {
        let data = [];
        data = JSON.parse(file);

        for (let val of data) {
          axios
            .get("http://192.168.2.75:3000/api/cameras/" + val)
            .then(function (res) {
              function getData() {
                data = res.data;
              }
            });
        }
        console.log(getData());
      }
    }
  );
};
