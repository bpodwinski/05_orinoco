const axios = require("axios");
const path = require("path");
const fs = require('fs');

exports.addToCart = (req, res, next) => {

    fs.readFile(path.resolve(__dirname, '../var/carts/cart_' + req.session.id + '.json'), (err, file) => {
        let product_id = req.body.product_id;
        let cart = [];

        if (!err) {
            cart = JSON.parse(file);
        }
        
        cart.push(product_id);

        fs.writeFile(path.resolve(__dirname, '../var/carts/cart_' + req.session.id + '.json'), JSON.stringify(cart), err => {
            if (err) {
                console.log(err);
            }
        });
    });
    
    
/*     let product_id = req.body.product_id;
    let product_name = req.body.product_name;
    let product_img = req.body.product_img;
    let product_price = req.body.product_price; */


/*     res.render('../views/cart', {
        test: test
    }) */

/*     axios({
        method: 'post',
        url: 'http://192.168.2.75:3000/api/cameras/order',
        data: {
            contact:
            {
                firstName: "firstName",
                lastName: "firstName",
                address: "firstName",
                city: "firstName",
                email: "firstName"
            },
            products: [req.body.product_id]
        }
    })
    .then ((res) => {
        console.log(res.data);
    }, (error) => {
        console.log(error);
    }); */
};