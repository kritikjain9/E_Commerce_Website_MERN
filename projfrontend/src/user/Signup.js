import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import {signup} from "../auth/helper";

const Signup = () => {

    //S14-06(state)- state is like a holy place, wherein we keep everything and update the things
    const [values, setValues] = useState({
        name : "",
        email : "",
        password : "",
        error : "",
        success : false

        /* these all by defalut values are a part of "values".
        we can access these by using => values.name, values.email, etc 
        or simply by destructuring of the data*/

        /* "setValues", are used to set these defalut values to some
        real values out there */
    });


    const {name, email, password, error, success} = values; //**destructuring */


    //how to handle these changes
    const handleChange = name => event => {                      
       /* this is a higher order function
       (here, we are defining only a single method to handle all the changes) */

        setValues({...values, error : false, [name] : event.target.value})          
        /* "name" is just a variable. Whatever value is coming, we are goona fill the "name"(or any other variable) up with the target value */
    };

    //action, when someone hits the submit button
    const onSubmit = event => {
        event.preventDefault()          //we are prevent the default click event
        //setting up the values
        setValues({...values, error : false})

        signup({name, email, password}) //signup method from auth/index.js
        .then(data => {
            if(data.error){
                setValues({...values, error : data.error, success : false})         //success is set to false
            }else{
                setValues({
                    ...values,
                    //all the fields that the user has filled, still have data, so 
                    name : "",
                    email : "",
                    password : "",
                    error : "",
                    success : true
                });
            }
        })
        .catch(console.log("Error in signup"));      
    };

    const signUpForm = () => {
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input className="form-control" onChange={handleChange("name")} type = "text" value = {name} />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input className="form-control" onChange={handleChange("email")} type = "email" value = {email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input className="form-control" onChange={handleChange("password")} type = "password" value = {password} />
                    </div>
                     
                    <button onClick = {onSubmit} className="btn btn-success btn-block w-100">Submit</button>
                </form>
            </div>
        </div>
        )
    };

    //success message
    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style = {{display : success ? "" : "none"}}>
            New Account created Succssfully! Please
            <Link to = "/signin">Login Here</Link>
                    </div>
                </div>
            </div>
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

    return(
        <Base title="Sign up page" title = "A user signup page">
        {successMessage()}
        {errorMessage()}
            {signUpForm()}                  {/* calling the signup form that we created */}
            <p className="text-white text-center">{JSON.stringify(values)}</p>                  {/* jsut for debugging pusrpose */}
        </Base>
    );
};

export default Signup;