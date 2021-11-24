var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    userinfo: {
      type: String,
      trim: true
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);



















// // import mongoose from 'mongoose';
// // const { Schema } = mongoose;

// var mongoose = require("mongoose");
// var Schema = mongoose.Schema;
// const crypto = require('crypto');
// const { v4: uuidv4 } = require('uuid/v4');



// //iss schema mei kitne bhi attributes mention kardo, accoring to your need
// //just remeber ki unko required mat karna warna paas karne hi padenge har baar

// var userSchema = new Schema({
//  name : {
//      type: String, 
//      maxLenght: 32, 
//      required: true, 
//      trim: true,    //just so that we dont have any whitespaces
//  },

// lastname : {
//     type: String, 
//     maxLength: 32, 
//     trim: true,
// },

// email : {
//     type: String, 
//     required: true, 
//     trim: true,
//     unique: true,
// },

// userinfo:{
//     type:String, 
//     trim : true,
// },

// encry_password:{
//     type: String, 
//     required: true,
// },

// salt:String,
// role:{
//     type: Number, //greate the numnber greater the score
//     default: 0
// },

// purchases :{
//     type: Array, 
//     default: []
// }

// }, {timestamps: true});



// //completing the user schema 
// userSchema.virtual("password")   
// .set(function(password){
//     this._password = password;
//     this.salt = uuidv4();
//     this.encry_password = this.securePassword(password);
// })        //setter

// .get(function(){
//     return this._password;
// })    //getter 




// userSchema.methods = {   
    
//     //password ko authenticate karwane ke liye ye ek alag method hoga
//     authenticate : function(plainpassword){
//         return this.securePassword(plainpassword) === this.encry_password;
//     },

//     //secure password banane ke liye ye method hoga
//     securePassword : function(plainpassword){
//         if(!plainpassword) return "";        //khaali password aaya toh, simply return kar denge
//         try {
//             //yahan apne ko encrypt karna hai password ko-->(nodeJs, encrypt password), read docs, as it is changed now
//             //[SYNTAX]        const hash = crypto.createHmac('sha256', secret)
//             //        .update('I love cupcakes')
//             //        .digest('hex');
//             return crypto.createHmac('sha256', this.salt)        //ye salt jo upar declare kiya tha
//             .update('plainpassword')
//             .digest('hex'); 
//         } catch (err) {
//             return "";
//         }
//     }
// };
// //ye secure password apne plain password ko kuch esa bana dega
// // console.log(hash);
// // Prints:
// //   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e------(***secure***)







// //to use this schema, we need to convert this to a mongoose model, export it
// module.exports = mongoose.model("User", userSchema);