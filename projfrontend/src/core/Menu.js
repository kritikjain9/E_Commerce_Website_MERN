//here we will have the navigation bar

import React, {Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";       
/*"withRouter" to have a compatibility between the nav-bar 
and all the routes that we have created in the router file that we created previously */

import {signout, isAuthenticated} from "../auth/helper";

const currentTab = (history, path) => {                         //THIS history variable is given by the "Link"
    //here we are checking that the if th "history.location.path.name" is equal to the active path, then a different color 
    if(history.location.pathname === path){
        return {color : "#2ecc72"}
    }else {
        return {color : "#FFFFFF"}
    }
};


const Menu = ({history}) => (                       //if you want to use "history", then you have to use it as a prop
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style = {currentTab(history, "/")} className="nav-link" to="/">
                    Home
                </Link>
            </li>    
            <li className="nav-item">
                <Link style = {currentTab(history, "/cart")} className="nav-link" to="/cart">
                    Cart
                </Link>
            </li>    

            {/* Showing the user, only the user dashboard */}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                <Link style = {currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">
                User Dashboard
                </Link>
                </li>    
                )}
                
            {/* Showing the admin, only the admin dashboard */}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (

                <li className="nav-item">
                <Link style = {currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                Admin Dashboard
                </Link>
                </li>    
            )}
        
            {!isAuthenticated() && (
                <Fragment>
            <li className="nav-item">
                <Link 
                style = {currentTab(history, "/signup")} 
                className="nav-link" 
                to="/signup">
                    Signup
                </Link>
            </li>    
            <li className="nav-item">
                <Link 
                style = {currentTab(history, "/signin")} 
                className="nav-link" 
                to="/signin">
                    Sign In
                </Link>
            </li> 
        </Fragment>   
            )}

            {/* conditional rendering the signout button */}
            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning" 
                    onClick={() => {
                        signout(() => {
                            history.push("/");                    //take me to the homepage
                        });
                    }}
                    >
                    Signout
                    </span>
                </li>    
            )}
        </ul>
    </div>
);

export default withRouter(Menu);        //coz we wanna use the menu withRouter
//this "withRouter(Menu)" will pickup all the routes using the "Link" from the routes.js