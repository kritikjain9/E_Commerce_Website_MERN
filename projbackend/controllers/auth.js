  //SECTION 6 -(08)Saving a user to the DB
  //save karne se pehle we have to mention on which model are we working on
  const User = require("../models/user")          //jis file name se throw kiya hai, usi se variable name banana(from the user model)
  const { check, validationResult } = require("express-validator");           //only validationResult will be used here, coz yahan user banane se pehle validate karwange
  var jwt =  require("jsonwebtoken");
  var expressJwt =  require("express-jwt");
  
//singning up a user
exports.signup = (req, res) => {
    //validating the user credentials
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

//SAVING THE USER IN THE DB    
const user = new User(req.body);
user.save((err, user) => {
    if(err || !user){
        return res.status(400).json({
            err: "NOT able to store the data in the DB"
        });
    }
    
    //if there is no error, then return this response in the JSON format
    res.json({
        name : user.name,
        email : user.email,
        _id : user._id
        });
    });
};





//S7-03
exports.signin = (req, res) => {              //TAKE A GOOD LOOK AT THE BOOKMARKS
    const {email, password} = req.body;         //destructuring the data
    const errors = validationResult(req);
    
    
    //VALTDATION(same as in the signup, [below])
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }
    //if we got the username and password, then-->
    
    //findOne() -> finds exaclty one match from the database(the very first one)
    //finding the email
    User.findOne({email}, (err, user) => {
        if(err || !user){
           return res.status(400).json({
                error : "USER EMAIL does not exist in the database"
            });
        }
        
        //finding the password in the DB - we will use the authenticate menthod declared in the user schema
        if(!user.autheticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }
        
        //if everything went fine, now SIGN IN the user
        //---> Create a TOKEN
        const token = jwt.sign({_id : user._id}, process.env.SECRET );
            
            // put that token into the cookies
            res.cookie("token", token, {expire: new Date() + 9999});
            
            //sending the response to the frontend, by destructuring
            const {_id, name, email, role} = user;
            return res.json({
                token,              //so that the frontend app can set this token into the local storage
                user: {
                    _id, name, email, role
                }
            });
        }); 
        
    };
    
    
    
    exports.signout = (req, res) => {
        //We just have to clear the cookies, and we donot have to work on anything as the user is just signing out
        // we will clear the cookie that we sent on line 77
        res.clearCookie("token");

        res.json ({
            message : "User signed out successfully"           
        });
    };
     


//S7-06
//creating protected routes
// exports.isSignedIn = expressJwt({           //this isSignedIn is also a custom middleware but we arent using next bcoz expressJwt is taking care of next internally
//     secret : process.env.SECRET,

//     //we are doing this as cookie parser allows us to set some of the user properties. This works on the request handler(req)
//     //this just adds a new property inside the request which is the userproperty auth 

//     userProperty : "auth",
// });
exports.isSignedIn = expressJwt({           //this isSignedIn is also a custom middleware but we arent using next bcoz expressJwt is taking care of next internally
    secret : 'secret',

    //we are doing this as cookie parser allows us to set some of the user properties. This works on the request handler(req)
    //this just adds a new property inside the request which is the userproperty auth 
    algorithms : ['HS256'],
    userProperty : "auth",
});
  

// S7-07
//creating custom middlewares

exports.isAuthenticated = (req, res, next) => {

    let checker = req.profile && req.auth && req.profile._id == req.auth._id;      //we will check three props from here - > 1) profile(will set this up from frontend), 2) auth(jo ki abhi upar waale middleware se set kari hai) , 3) that ye dono jo id de rahe hain, wo same hai ya nahi
    //we are using "==" just to check the values, not the object
    if(!checker){
        return res.status(403).json({
            error : "ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {

    //see the user model. we have defined a property number which sets is on the basis of the role of the user
    if(req.profile.role === 0){
        return res.status(403).json({
            error : "ACCESS DENIED, You are not an Admin"
        })
    }

    next();
}





















//   //SECTION 6 -(08)Saving a user to the DB
//   //save karne se pehle we have to mention on which model are we working on
//   const User = require("../models/User")          //jis file name se throw kiya hai, usi se variable name banana(from the user model)
//   const { check, validationResult } = require("express-validator");           //only validationResult will be used here, coz yahan user banane se pehle validate karwange
//   var jwt =  require("jsonwebtoken");
//   var expressJwt =  require("express-jwt");
  
// //singning up a userz
// exports.signup = (req, res) => {
//     //validating the user credentials
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(422).json({
//             error : errors.array()[0].msg
//         });
//     }

// //SAVING THE USER IN THE DB    
// const user = new User(req.body);
// user.save((err, user) => {
//     if(err){
//         return res.status(400).json({
//             err: "NOT able to store the data in the DB"
//         });
//     }
    
//     //if there is no error, then return this response in the JSON format
//     res.json({
//         name : user.name,
//         email : user.email,
//         //CHANGE _ID TO ID////////////
//         _id : user._id
//         });
//     });
// };





// //S7-03
// exports.signin = (req, res) => {              //TAKE A GOOD LOOK AT THE BOOKMARKS
//     const errors = validationResult(req);
//     const {email, password} = req.body;         //destructuring the data
    
    
//     //VALTDATION(same as in the signup, [below])
//     if(!errors.isEmpty()){
//         return res.status(422).json({
//             error : errors.array()[0].msg
//         });
//     }
//     //if we got the username and password, then-->
    
//     //findOne() -> finds exaclty one match from the database(the very first one)
//     //finding the email
//     User.findOne({email}, (err, user) => {
//         if(err){
//             res.status(400).json({
//                 error : "USER EMAIL does not exist in the database"
//             });
//         }
        
//         //finding the password in the DB - we will use the authenticate menthod declared in the user schema
//         if(!user.authenticate(password)){
//             return res.status(401).json({
//                 error: "Email and password do not match"
//             });
//         }
        
//         //if everything went fine, now SIGN IN the user
//         //---> Create a TOKEN
//         const token = jwt.sign(
//             {_id : user._id}, process.env.SECRET 
//             );
            
//             // put that token into the cookies
//             res.cookie("token", token, {expire: new Date() + 9999});
            
//             //sending the response to the frontend, by destructuring
//             const {_id, name, email, role} = user;
//             return res.json({
//                 token,              //so that the frontend app can set this token into the local storage
//                 user: {
//                     _id, name, email, role
//                 }
//             });
//         }); 
        
//     };
    
    
    
//     exports.signout = (req, res) => {
//         res.json ({
//             message : "User siginout"           //this is will the same response on the server {message : "user signout"}
//         });
//     };
    
    
    
