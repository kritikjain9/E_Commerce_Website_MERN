const express = require("express");

//then this express wil create a router
const router = express.Router();        //Then creating the object of express router

//bringing the controllers as well
const{getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require("../controllers/category");

//we will bring in the middleware from auth just to authenticate the user
const{isSignedIn, isAdmin, isAuthenticated} = require("../controllers/auth");
const{getUserById} = require("../controllers/user");

//params
router.param("userId", getUserById);            //ab ise kabhi bhi userId mili in the parameter, then it will populate my request profile field
router.param("categoryId", getCategoryById);



//actual routes go here
//create routes
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

//we want to get the access of the category
//read(get) routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);


//update(put) routes
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);


//delete routes
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;