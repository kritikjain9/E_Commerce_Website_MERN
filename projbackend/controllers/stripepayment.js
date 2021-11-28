const stripe = require("stripe")("SECRET_KEY");
const { v4: uuidv4 } = require('uuid');
 

exports.makepayment = (req, res) => {
    const {token, products} = req.body;
    console.log("PRODUCTS", products);

    let amount = 0;
    products.map(p => {
        amount = amount + p.price;
    });

    //this will be only fired once, and will keep the track that user doesn't get charged twice for the same purchase
    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email : token.email,
        source : token.id
    })
    .then(customer => {
        //if the customer is created, then we can create charges
        stripe.charges.create({
            amount : product.price * 100,
            currency : "usd",
            customer : customer.id,
            receipt_email : token.email,
            description : `Purchase of ${product.name}`,
            shipping : {
                name : token.card.name, 
                address : {
                    country : token.card.address_country
                }
            }
        }, {idempotencyKey})
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    });
};





