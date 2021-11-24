import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect} from 'react-router-dom';

import {signin, authenticate, isAuthenticated} from "../auth/helper";

const Signin = () => {

    //state
    const[values, setValues] = useState({
        email : "at@gmail.com",
        password : "12345",
        error : "",         
        loading : false,             //{/* we'll have a loading message to shoe the user to wait, some things are going on */}
        didRedirect : false          //is user signin is successful, then redirect him to somewhere like user dashboard
    });

    const {email, password, error, loading, didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {                      
        /* this is a higher order function
        (here, we are defining only a single method to handle all the changes) */
 
         setValues({...values, error : false, [name] : event.target.value})          
         /* "name" is just a variable. Whatever value is coming, we are goona fill the "name"(or any other variable) up with the target value */
     };

    const onSubmit = event => {
        event.preventDefault();
        /* The Event interface's preventDefault() method tells the user agent 
        that if the event does not get explicitly handled, its default action 
        should not be taken as it normally would be. */

        setValues({...values, error : false, loading : true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error : data.error, loading : false})
            }else{
                authenticate(data, () => {
                    /* this callback fn will clear up all the data from the form */
                    setValues({
                        ...values,
                        didRedirect : true,
                    })
                })
            }
        })
        .catch(console.log("Signin request failed"))
    };

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                //will redirect this user to the admin dashboard
                return <Redirect to = "/admin/dashboard" />;
            }else{
                // will redirect this user to the user dashboard
                return <Redirect to = "/user/dashboard" />;
            }
        }

        if(isAuthenticated()){
            return <Redirect to = "/" />            //redirecting to the home page
        }
    };

     //loading message
    const loadingMessage = () => {
       return (
           loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
           )
       );
    };

    //error message
    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" 
        style = {{display : error ? "" : "none"}}>              {/* flexbox - if there is error, then display it, else dont display anything */}
            {error}         {/* displaying the error method directly */}
                    </div>
                </div>
            </div>  
        );
    };

    const signInForm = () => {
        return(<div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input onChange = {handleChange("email")} value = {email} className="form-control" type = "email" />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input onChange = {handleChange("password")} value = {password} className="form-control" type = "password" />
                    </div>
                     
                    <button onClick = {onSubmit} className="btn btn-success btn-block w-100">Submit</button>
                </form>
            </div>
        </div>
        )
    }

    return(
        <Base title="Sign-in page" title = "A user signin page">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
        <p className = "text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signin;