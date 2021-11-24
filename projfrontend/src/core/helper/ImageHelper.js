//creating this component to dynamically load the images
import React from 'react';
import {API} from "../../backend";          
/* importing the API from projbackend, coz we want to hit the 
"/product/photo/:productId" path which will give us the photo */

const ImageHelper = ({product}) => {

    const imageurl = product ? `${API}/product/photo/${product._id}` : `https://cdn.dribbble.com/users/3512533/screenshots/14168376/web_1280___8_4x.jpg`
    /* if there is a product, then load its image else load the error image */

    return(
        <div className="rounded border border-success p-2">
            <img
                src={imageurl}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
            </div>
    )
}

export default ImageHelper;