import React,{ useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
//loadCart will help us to load all the items into out state


const StripeCheckout = ({products, setReload = f => f, reload = undefined}) => {

    const [data, setData] = useState({
        loading : false,
        success : false,
        error : "",
        address : ""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    
    const getFinalAmount = () => {
        let amount = 0;
        products.map(product => {
            amount += product.price;
        });
        return amount;
    };

    //showing the stripe button
    const showStripeButton = () => {
        /* conditional rendering -> if the user is logged in, show him something,
        else redirect him to the login page */
        return isAuthenticated() ? (
            <button className="btn btn-success">Pay with Stripe</button>
        ) : (
            <Link to = "/signin">
                <button className="btn btn-warning">Sign In</button>
            </Link>
        ) 
    };

    

    return(
        <div>
            <h3 className = "text-white">Stripe Checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;