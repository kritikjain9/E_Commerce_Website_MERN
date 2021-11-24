/* we want to hit the "loacalhost:8000/api/products" path to show 
all the products to the user on the homepage in the card format */

import { API } from "../../backend";

export const getProducts = () => {
    return fetch(`${API}/products/`, {method : "GET"})
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
}