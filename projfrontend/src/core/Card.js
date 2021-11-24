import React, {useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";



const Card = ({
    product,  
    addtoCart = true, 
    removeFromCart = false, 
    setReload = f => f,
    /* f => f is same as function(f){return f} this means whatever you are
    going to paas into this function, it will simply return it back.
    We are doing this to just reload the page*/
    
    reload = undefined
}) => {
    
    //states
    const [redirect, setRedirect] = useState(false);    
    const [count, setCount] = useState(product.count);    
    //passing a new property in the product--> "count", so we can increment it

    //will inject these values in a Particular Card
    const cardTitle = product ? product.name : "A Product";
    const cardDescription = product ? product.description : "Product Description";
    const cardPrice = product ? product.price : "Default Price";

    //to change the state of "redirect"
    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    //checking if redirect is possible, if yes then redirect the user to the cart
    const getARedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = addtoCart => {
        {/* addToCart = is by defaut true */}
        return(
            // conditional rendering
            addtoCart && (
                <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                Add to Cart
                </button>
            )
        )
    }
    
    const showRemoveFromCart = (removeFromCart) => {
        {/* removeFromCart = is by defaut false */}
        return(
            removeFromCart && (
                <button
                onClick={() => {
                    removeItemFromCart(product._id);
                    setReload(!reload);
                    //setReload - if this was false, turn it true, else vice-versa

                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
            {getARedirect(redirect)}
            <ImageHelper product = {product}/>

            <p className="lead bg-success font-weight-normal text-wrap">
           {cardDescription}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
            <div className="row">

            {/* conditional rendering of addToCart*/}
            <div className="col-12">
            {showAddToCart(addtoCart)}      
            </div>
                
            {/* conditional rendering of RemoveFromCart*/}
            <div className="col-12">
            {showRemoveFromCart(removeFromCart)}      
            </div>
            </div>
        </div>
        </div>
    );
    };


   export default Card;
