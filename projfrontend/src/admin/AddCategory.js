// S16-01
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {createCategory} from "./helper/adminapicall";

//we want to mount this component on the route that we created previously in the admindashboard
const AddCategory = () => {

    //we will create states
    const [name, setName] = useState("");        //"initialState" will be empty
    
    //success and error messages
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const {user, token} = isAuthenticated();
    // the same token that we were copying and pasting while using postman

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    );

    const handleChange = (event) => {
        setError("");            //using this coz we dont touch the state (here, error) directly. Setting the error as empty
        //similarly,
        setName(event.target.value);            //this will set the name which the admin passed in the form
        
    
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        
        //backend request fired (by importing the createCategory method, from /helper/adminApiCall);
        createCategory(user._id, token, {name})             //passing the category as an object,"{name}" as we've used JSON.stringify
        .then(data => {
            if(data.error){
                setError(true);
            }else{
                setError("");
                setSuccess(true);
                setName("");
            }
        });
    };

    const successMessage = () => {
        if(success){
            return (<h4 className="text-success">
                Category Added Successfully!
            </h4>)
        }
    };
    const warningMessage = () => {
        if(error){
            return <h4 className="text-warning">
                Failed to create category
            </h4>
        }
    };

    //the form for adding a new product(creating this inside its own function)
    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className = "lead" >
                    Enter the Category
                </p>

                <input type="text" 
                className="form-control my-3"
                onChange = {handleChange}
                value = {name} 
                autoFocus
                required
                placeholder = "For example Summer"
                />

                <button onClick = {onSubmit} className="btn btn-outline-info">
                    Create Category
                </button>
            </div>
        </form>
    );

    return (
        <Base title="Create a new category" description = "Add a new Category" className = "container bg-success p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()} 
                    {goBack()}
                </div>
            </div>
        </Base>
    )
};

export default AddCategory;