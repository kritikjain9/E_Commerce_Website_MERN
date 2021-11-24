//IMPORTING THE USER MODEL, so that the user can be injected/used
const User = require("../models/user"); 
const Order = require("../models/order");

//exporting a method so that params can be handled
exports.getUserById = (req, res, next, id) => {          //id will be coming from the URL
    User.findById(id).exec((err, user) => {              //we can chain this to an execution method, also findById ki jagah findOne bhi use kar sakte the
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in the DB"           
            });
        }

        //CREATING AN OBJECT inside the request and storing the user value inside it. This "getUserById" populates my req.profile
        req.profile = user;         //all the info that we needed was inside this
        next();                     //next, as this is a middleware :)
    });                           
};





//a simple method to grab the user
exports.getUser = (req, res) => {

    //now we want that out of all the props that are populated in the users browser, we want the salt and encrypted passwords to be hidden, 
    //so,
    // req.profile.salt = "";
    // req.profile.encry_password = "";     //agar aisa kiya, then wo ye fields dega result set mei, but dono empty rehengi, insted we can make them undefined, so that wo result ka part hi na rahein
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;  
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    /*these properties are only undefined in the users profile,
    not in the DB */


    return res.json(req.profile);                   //jo upar extract kiya tha
};


//S8-07(PUT REQUEST)
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        //kis kis cheez ko change karna hai, here-> _id

        //lookup docs, finding
        {_id : req.profile._id},

        //jp bhi values update karna ho, we pass them into the $set
        {$set: req.body},
        {new : true, useFindAndModify: false},     //useFindAndModify, by defalult false hota hai 
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error : "You can't update this user"
                });
            };

            //dont wanna send everything
            user.salt = undefined;
            user.encry_password = undefined;  
            res.json(user);
        }
    )
}

// S8-09
exports.userPurchaseList = (req, res) => {

    //we are pulling up this info from the order model, and are selecting the orders based on the id 
    Order.find({user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error : "No order found!"
            });
        }
        return res.json(order);
    });                             
};


// S8-10
exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];

    /*yahaan se info aaegi->we will pass this info from the purchase body
    In the order, we have products and for each product we will create
    a new object and then will push it in the purchase array*/

    req.body.order.products.forEach(product => {
        purchases.push({
            //will be pushing this object here
            _id : product._id,
            name : product.name,
            description : product.description,
            category : product.category,
            quantity : product.quantity,

            //we will pushing these two info more, from the request body not from the product
            amount : req.body.order.amount,
            transaction_id : req.body.order.transaction_id
        });
    });


    //storing this info in the DB
    User.findOneAndUpdate(
        {_id : req.profile._id},
        {$push : {purchases : purchases}},       //{updating the purchase array in the user model : with this array}
        {new : true},               //when we se this, we are asking to send the updated object, not the older one
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error : "Unable to save your purchase List"
                });
            }
            next();
        }
    )

    //we are using the "findOneAndUpdate" method because we want to update orders array(if we already had some purchases    )
    
}








//assignment
// exports.getAllUsers = (req, res) => {
//     User.find().exec((err, users) => {
//         if(err || !users){
//             return res.status(400).json({
//                 error: "No user found" 
//             })
//         }
//         res.json(users);
//     })
// }