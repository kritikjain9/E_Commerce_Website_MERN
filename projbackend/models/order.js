const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    //ab ye jo products cart me honge, ye unhi kuch products me se honge, which we have already created. So, we will refer to the same products here as well
    product : {
        type : ObjectId,
        ref : "Product",
    },
    
    name : {
        type : String,
    },
    
    count : {
        type : Number,
    },
    
    price : {
        type : Number,
    },
    
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema({
    products : [ProductCartSchema],                 //will create the file "ProductCartSchema" later on. We have created the"ProductCartSchema" in the same file only. Upar dekh bro

    transaction_id : {},

    address : {
        type : String, 
        maxlength : 2000
    },

    amount : {
        type : Number,
    },

    status : {
        type : String, 
        default : "Recieved",
        enum : ["Cancelled", "Delivered", "Processing", "Shipped", "Recieved"]  
        /* The order can only be in one of the following set of values, so that
        on the basis of it we can further process the order */              
    },

    updated : Date, 

    //S08-09
    //this order schema is dependent upon the user and we can populate anything from this using "populate".
    user : {
        type : ObjectId,
        ref : "User"            //The ref option is what tells Mongoose which model to use during population, in our case the Story model
    },

}, {timestamps : true});

//to throw both the schemas out of the file, we will do --->
const Order = mongoose.model("Order", OrderSchema);


module.exports = {Order, ProductCart};
//---------------------OR-----------------------------
//const = mongoose.model("Order", OrderSchema);
//module.exports = {Order, and wo upar waale ka naam, if you are exporting the files the this   }