require("dotenv").config();           //for using the environment variables(dotenv) file, and if there are any variables inside it, we wanna use it.

const mongoose = require('mongoose');
const express = require('express');     //  required for listening
const app = express();          //this app uses the express   
//we will be using these three middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");  
const cors = require("cors");



//my routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");
const stripeRoutes = require("./routes/stripepayment.js");



//DB CONNECTION
//mongodb://--connnecting string--:--port number--/--db-name--
mongoose.connect(process.env.DATABASE,     //mongoose.connect('mongodb://localhost:27017/tshirt', 'process' me saaare environment variable attached hote hain
{
    useNewUrlParser : true,                 
    useUnifiedTopology: true,
    useCreateIndex: true                //just used to keep our database alive
}).then(() => {
    console.log("DB CONNECTED")
})


//THEN()- successive funtions ko run karne ke liye we use it
//myFunction.run().then().catch();
//pehle myfunction ko chala do, agar successfully chal gaya, then catch block chala dena
//HERE, humne db ko connect karke message de diya DB CONNECTED




//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



//MY ROUTES
app.use("/api", authRoutes);        //jab koi bhi api pe jaega, that is the authRouts from auth folder, then i want to run the authRoutes(see the dependecy above)
//YE /API WILL BE PREFIXED IN EVERY ROUTE OF THIS AUTHROUTES FILE - EX- "http://localhost:8000/api/signout"
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);




//PORT
const port = process.env.PORT || 8000;
//if we mention this diresctly, then everyone will be able to see our port number and our local host address.  SO it is recommended to do this by using environmenbt variables




//STARTING THE SERVER
app.listen(port, () => {
    console.log(`App is running at port - ${port}`);    //just to check if everything is fine
});
