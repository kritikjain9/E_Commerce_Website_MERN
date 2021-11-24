const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user");
const {updateStock} = require("../controllers/product");

const {getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus} = require("../controllers/order");

//parameter extractor
router.param("userId", getUserById);                //-> is there's anything look like the userID in the URL, simply run our method getUserById 
router.param("orderId", getOrderById);


//actual routes
//create route
router.post("/order/create/:userId", 
isSignedIn,
isAuthenticated,
pushOrderInPurchaseList, 
updateStock, 
createOrder
);


//status of the order'
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);

//to update the oder status
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);




//read route
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);


module.exports = router;