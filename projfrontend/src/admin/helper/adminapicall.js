//this file is for interacting with the backend, especially the routes

import { API } from "../../backend";

//refer the backend-> routes/category.js
// route: /category/create/:userId


//CATGORY CALLS

//create category(C)
export const createCategory = (userId, token, category) => {

    //Same as what we were doing in the postman
    return fetch(`${API}/category/create/${userId}`, {
        //after hitting the URL, we will pass the header information
        method : "POST",

        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        
        body : JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


//get all categories(R)
export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method : "GET",
    })
    .then(response => {
        // console.log(response.body);
        return response.json();
    })
    .catch(err => console.log(err));
};


//product calls

//create product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {

        method : "POST",

        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        
        body : product
    })
    .then(response => {
        return response.json();
    })
    .catch(error =>console.log(error));
};

//get all products(R)
export const getAllProducts = () => {
    return fetch(`${API}/products`, {

        method : "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


//get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };



//update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        
        method : "PUT",
        
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        
        body : product              //this product will be the new info that we will pass during in the DB, which will replace the old product
    })
    .then(response => {
        return response.json();
    })
    .catch(error =>console.log(error));
};



//delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {

        method : "DELETE",

        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(error =>console.log(error));
};

// export const deleteCategory = (categoryId, userId, token) => {
//     return fetch(`${API}/category/${categoryId}/${userId}`, {

//         method : "DELETE",

//         headers : {
//             Accept : "application/json",
//             Authorization : `Bearer ${token}`
//         }
//     })
//     .then(response => {
//         return response.json();
//     })
//     .catch(error =>console.log(error));
// };