import {API} from "../../backend";          //API is http://localhost:8000/api/ (coming from the .env file)




export const signup = user => {
    /* This signup method will take user as a param which will
    come from the frontend as a JSON format */
    return fetch(`${API}/signup`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })                      //the fetch method
    .then(response => { 
        /* if evertything went fine then simply 
        return the response in the JSON format */
        return response.json();
    })
    //else, handle the error
    .catch(err => console.log(err));
};



export const signin = user => {
    return fetch(`${API}/signin`, {
        method : "POST",
        headers : {
            Accept : "application/json",                //Accept doesnt have double quotes around it
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })                      //the fetch method
    .then(response => { 
        return response.json();
    })
    .catch(err => console.log(err));
};

//the authenticate method is associated with the signin method
export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        /* if the window object is accessible to us, then set the JWT token
        to check whether the user is signed in or not*/

        /* here, we'll put the token in the users browser */
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
};



export const signout = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")          
        /* this time when the user is signing out, then simply
         remove the token from the users browser */
        next();

        //logging out the user from the backend
        return fetch(`${API}/signout`, {
            method : "GET"
        })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err))
    }
};



//method to validate whether the user is signed in or not
export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }       //if window obj is not found then simply return false

    /*if you found the window object, then 
    we aren't returning true directly, rather we are returning that 
    jwt response only, coz in the frontend, we are gonna check again whether the token
    is same exactly as it was returned from here*/
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));             //this will return the entire jwt object from the local storage
    }else{
        return false;
    }
};