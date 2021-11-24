import React, {useState, useEffect} from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import Paymentb from './Paymentb';



const Cart = () => {

    const [products, setProducts] = useState([]);
    
    //just to remount the component
    const [reload, setReload] = useState(false);


    useEffect(() => {
        setProducts(loadCart())
    }, [reload]);
    /* "[]" passing reload in here to state then whenever the things change, 
    a foreful reload should happen so that the user can see it in the UI  */

    const loadAllProducts = (products) => {
        return (
            <div>
                <h2>This section will load the products</h2>
                {products.map((product, index) => (
                    <Card 
                        key = {index}
                        product = {product}
                        removeFromCart = {true}
                        addtoCart = {false}
                        setReload = {setReload}
                        reload = {reload}
                    />
                    )
                )
            }
            </div>
            )
        };
            
    const loadCheckout = () => {
        return (
            <div>
                <h2>This section will load the products</h2>
            </div>
            )
        };

    return(
        <Base title = "Cart Page" description = "Your Shopping Cart">
            <div className="row text-center text-capitalize">
                <div className="col-6">{products.length > 0 ? loadAllProducts(products) : (<h3>No Products Here</h3>)}</div>

                {/* will load the UI provided by Braintree here */}
                <div className="col-6">
                <Paymentb 
                products = {products}           //throwing up the products from the state
                setReload={setReload}           //force reloading to display the updated UI
                />  
                </div>

            </div>
        </Base>
    );
};


export default Cart;