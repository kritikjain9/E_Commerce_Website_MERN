const express = require("express");
const router = express.Router();

//authentication meiidlewares
const {isSignedIn, isAuthenticated} = require("../controllers/auth");
const {getToken, processPayment} = require("../controllers/paymentb");

//get route - to generate the token
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);


//post route - to submit the info and process the payment
router.post("/payment/braintree/:userId",  isSignedIn, isAuthenticated, processPayment);

module.exports = router;