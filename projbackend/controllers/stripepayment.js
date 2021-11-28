const stripe = require("stripe")("sk_test_51K0hkVSAV6AvQGT5jfSSwrvJEmxKA39sGPnBRe4ellqiLbdMkaUMYZPSTxXTDn7jmzX7766flvekEuzuXr5DdXBg00dRIbHK2I");
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
                    city : token.card.address_city, 
                    country : token.card.address_country, 
                    postal_code : token.card.address_ip 
                }
            }
        }, {idempotencyKey})
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    });
};





