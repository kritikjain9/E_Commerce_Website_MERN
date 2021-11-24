const express = require("express");

const app = express();
// const port = 3000
//port number can be anything, like 3000, 8000 etc

// app.get('/home', (req, res) => {
//   res.send('Hello World!')
// })
// //here we are making a get request onto the home route

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
// //the app is listening on port 3000

const port = 8000;

const adminRoute = (req, res) => {
    //ye aone ko browser pe dikhegi
    return res.send("This is the admin route");
};

//designing a middleware (-isAdmin-)that will check, ki bhaiya jis bande ko admin page pe redirect kar rahe hain, is he actually the admin or not
const isAdmin = (req, res, next) => {
    //checking admn logic
    //this console log will be there on the console
    console.log("This is admin trynna login");
    next();     //now, admin login waala route mei(below)
}

const isLoggedIn = (req, res, next) => {
    //Logged In login
    console.log("Yes, the user is logged In");
    next();
}

app.get("/admin", isLoggedIn, isAdmin, adminRoute)           //ye upar waale method ko call kar rahha hai directly

app.get("/", (req, res) => {
    return res.send("aagaye aap?");
})

app.get("/signout", (req, res) => {
    return res.send("you are being redirected to the siginout page");
})

app.get("/signin", (req, res) => {
    return res.send("you are being redirected to the signin page");
})

app.listen(port, () => (console.log("Mai tumhe sun sakta hun")));