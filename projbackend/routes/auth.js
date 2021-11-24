var express = require("express");
var router = express.Router();
const {signout, signup, signin, isSignedIn} = require("../controllers/auth");
//signout utha ke le aao, controllers waale foler me se, and then we'll use the controller here
const { check, validationResult } = require('express-validator');           //only check will be used here


//MAKING A ROUTE
router.get("/signout", signout);

router.post(
    "/signup",          //route

    //validator
    [
    check("name", "name is invalid"),
    check("email", "Email is required").isEmail(),
    check("password", "Please enter a valid password").isLength({min: 3}),

    //you can apply as many checks as you want
    ],

    signup);            //controller


router.post(
    "/signin",       

    [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({min: 1}),
    ],

    signin);   

router.get("/testroute", isSignedIn, (req, res) => {
    // res.send("A protected route");
    res.json(req.auth);  
});

module.exports = router;



