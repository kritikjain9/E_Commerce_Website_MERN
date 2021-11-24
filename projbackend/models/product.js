const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
//we can refer this objectId to the schema that we have created(line 27...)

const productSchema = new mongoose.Schema({
    name : {
        type : String, 
        trim : true, 
        required : true, 
        maxlength : 32
    },

    description : {
        type: String,
        trim : true, 
        required : true, 
        maxlength : 2000
    },

    price : {
        type: Number, 
        trim : true,
        required : true, 
        maxlength : 32
    },

    //we want this category to be linked to the categorySchema module that we created, so 
    category : {
        type : ObjectId,
        ref : "Category",       //ye mention karna hai from where is this objectId coming from, mention the name that you have exported out
        required : true
    },

    stock : {
        type : Number
    },

    sold : {
        type : Number, 
        default : 0         //starting mei toh 0 hi biki hongi na
    },

    photo : {
        //
        data : Buffer, 
        contentType : String
    }

}, 
    {timestamps : true},
);


module.exports = mongoose.model("Product", productSchema);