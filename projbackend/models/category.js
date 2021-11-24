var mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String, 
        trim: true,
        maxlength: 32,
        unique: true,
        required: true
    }
}, {timestamps : true});
//we can fileter our entries on the basis of time. Timestamps se apn koi bhi enrty karenge, toh jis time pe entry hui, wo time bhi database mei reflect hoga

module.exports = mongoose.model("Category", categorySchema);
//module.exports = mongoose.model("--Jis naame se tum ise refer karna chahte ho--", --name of the schema--);