import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Signin from './user/Signin';
import Signup from './user/Signup';

import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";

//S16-01
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';


const Routes = () => {
    return(
        <BrowserRouter>         {/* we will return our browser router */}
        {/**wrapping up everything inside this switch as we want to go to only a single path
        if switch is not used, then all the paths will mount up on each other */}
            <Switch>     
                {/* PUBLIC ROUTES */}
                <Route path = "/" exact component = {Home} />               {/* exact: bool. When true, will only match if the path matches the "location.pathname" exactly. */}
                <Route path = "/signup" exact component = {Signup} />              
                <Route path = "/signin" exact component = {Signin} />  
                <Route path = "/cart" exact component = {Cart} />  
                
                {/* PRIVATE ROUTES */}
                <PrivateRoute path = "/user/dashboard" exact component = {UserDashBoard} />  

                {/* ADMIN ROUTES */}
                <AdminRoute path = "/admin/dashboard" exact component = {AdminDashBoard} /> 
                
                <AdminRoute path = "/admin/create/category" exact component = {AddCategory} />  
                <AdminRoute path = "/admin/categories" exact component = {ManageCategories} />  
                <AdminRoute path = "/admin/create/product" exact component = {AddProduct} />  

                <AdminRoute path = "/admin/products" exact component = {ManageProducts} />  
                <AdminRoute path = "/admin/product/update/:productId" exact component = {UpdateProduct} />  
                  
            </Switch>
        </BrowserRouter>
    );
};



export default Routes;