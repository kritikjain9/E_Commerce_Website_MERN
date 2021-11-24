const braintree = require("braintree");
// const {getUserById} = require("../controllers/user");
// router.param("userId", getUserById);


/* These details are from 
https://sandbox.braintreegateway.com/merchants*/

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "9z8qnv7msv4k94vt",
  publicKey: "3dt8qk22svbm3ks9",
  privateKey: "5a3009497d49b89ca7376c270fe2ae93"
});
//without these the token is not going to be generated


exports.getToken = (req, res) => {
    
       gateway.clientToken.generate({}, (err, response) => {
           if (err) {
              return res.status(500).send(err);
           } else {
              return res.send(response);
           }
       });
   }

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, 
      (err, result) => {
        if(err){
            res.status(500).json(error);
        }else{
            res.json(result);
        }
      });
};