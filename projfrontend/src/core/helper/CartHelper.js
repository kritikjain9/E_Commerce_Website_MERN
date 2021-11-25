/* this method will store everything into the cart 
and in turn, in the local storage and will furhter
populate the cart page with this info*/

export const addItemToCart = (item, next) => {
    /* "next", because we want to redirect the user to the cart Page, 
    so we will need a callback*/ 
    let cart = [];              //initially the cart will be empty

    if(typeof window !== undefined){
        //if we have access to the window object(local storage)

        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        //pushing this temp cart to the original cart
        cart.push({
            ...item,
            count: 1        //pushing the item with its count = 1
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};

export const loadCart = () => {
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
};


export const removeItemFromCart = (productId) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, index) => {
            if(product._id === productId){
                cart.splice(index, 1)
            }
        });

        //updating the cart
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
};


//when a user make a purchase, emptying out a cart
export const cartEmpty = next => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart");
        next();
    }
};