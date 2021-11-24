const express = require("express");
const router = express.Router();

const {getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");


//to extract info from parameters we need to handle these params
router.param("userId", getUserById);
router.param("productId", getProductById);



//all the actual routes
//create route
router.post("/product/create/:userId", 
isSignedIn, 
isAuthenticated, 
isAdmin, 
createProduct
);


//read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);             //middleware for loading the photo


//delete route
router.delete("/product/:productId/:userId", 
isSignedIn, 
isAuthenticated, 
isAdmin, 
deleteProduct
);

//update route
router.put("/product/:productId/:userId", 
isSignedIn, 
isAuthenticated, 
isAdmin, 
updateProduct
);




/* listing route (grabbing all the products in one page,
but we have to limit that how many products to be shown here) */
router.get("/products", getAllProducts);

/* for getting all the 
categories */
router.get("/products/categories", getAllUniqueCategories);


module.exports = router;                //this  is mapping a router and all logic that's required to map /--filename-- (along with the right callbacks etc...)