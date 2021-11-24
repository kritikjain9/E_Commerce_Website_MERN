const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user");                //this getUserById method will populate our req.profile method(checkout this method from controllers)
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");                                    //we will use the auth controllers here, to authenticate stuff   


router.param("userId", getUserById);


// "/user" -> with all the routes associated with the user, the the getUser controller will be run, but before letting him check this sensitive info, we will use a authentication middleware
// router.get("/user/:userId", isSignedIn, isAuthenticated, isAdmin,  getUser);  
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);   
                                               

//S8-07(PUT REQUEST)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);



// S8-09
//we are free to specify this path as we want--("/orders/user/:userId")
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);      



//assignment
// router.get("/users", getAllUsers);

//jo bhi aaraha hai use export bhi karna padega
module.exports = router;