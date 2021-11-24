const Product = require("../models/product");
const formidable = require("formidable");           //will use this to handle the form data
const _ = require("lodash");           //naming a private varible as (_) coz we dont wanna use it much
const fs = require("fs");       //a=for accessing the path of the file need to have the file System(fs).(comes up by defult in node)

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")               //here we are populating our product on the basis of its category(we can chain as many methods as we want)
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error : "Product not found"
            });
        }
        //if no error, then simply populate the request, by the product that we have
        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    //this will take the advantage of the form data
    let form = new formidable.IncomingForm();           //the object of form
    form.keepExtensions = true;

    //parsing the form
    form.parse(req, (err, fields, file) => {            //fields -> text;   files -> jpeg, pdf, etc.
        if(err){
            return res.status(400).json({
                error : "Problem with image"
            });
        }

        //destructure the fields (coming from the product model), which will be entered by the user
        const {name, description, price, category, stock} = fields;                             //Ex- here, this price is => fields.price

        //placing some restrictions here
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error : "Please include all fields"
            });
        }

        //TODO:restrictions on field (done-> line 37)
        let product = new Product(fields);                  //rn fields are being recieved in the product, jo ki user daalega

        //handling the file/photo here
        if(file.photo){
            if(file.photo.size > 3000000){                  //should be less than 3MB
                return res.status(400).json({
                    error : "File size too big!"
                });
            }
            //will mention the full path.
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }


        //saving this to the DB
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error : "Saving tshirt to DB failed"
                });
            }
            res.json(product);
        });
    });

};

exports.getProduct = (req, res) => {
    //we cant directly serve these binary files directly on a get request, as its bulky to grab them directly from the DB
    //so,
    req.product.photo = undefined;                 //bcz of this, the below request will parse absolutely fast, as we donot have any bulky data


    return res.json(req.product);
}


//midlleware to load the photo in the background
exports.photo = (req, res, next) => {
    if(req.product.photo.data){                 //checking if there is data or not
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}


//delete controller
exports.deleteProduct = (req, res) => {
    let product = req.product;          //grabbing the product that you need to delete
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: `Could not delete the ${product} product`
            })
        }

        res.json({
            message : "Product deleted Successfully",
            deletedProduct
        })
    });

};

//update route
exports.updateProduct = (req, res) => {
    //the UI of this will be the same as we had in the create product, but here, the updation of the product will happen
    let form = new formidable.IncomingForm();           //the object of form
    form.keepExtensions = true;                         //coz we want the filextensions as well

    //parsing the form
    form.parse(req, (err, fields, file) => {            //fields -> text;   files -> jpeg, pdf, etc.
        if(err){
            return res.status(400).json({
                error : "Problem with image"
            });
        }

        //destructure the fields (coming from the product model), which will be entered by the user
        const {name, description, price, category, stock} = fields;                             //Ex- here, this price is => fields.price

        //updation code
        let product = req.product;                              //grabbing the existing product, not creating a new one

        //using lodash
        //_.extend(object, sources) - The _.extend() method is like the _.assign() method except that it iterates over its own and inherited source properties. 
        //this extends the old properties, as well as updates them
        product = _.extend(product, fields);

        //handling the file/photo here
        if(file.photo){
            if(file.photo.size > 3000000){                  //should be less than 3MB
                return res.status(400).json({
                    error : "File size too big!"
                });
            }
            //will mention the full path.
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }


        //saving this to the DB
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error : "Updation failed"
                });
            }
            res.json(product);              //showing the info of the product back to the user
        });
    });
};




//product listing
exports.getAllProducts = (req, res) => {

    let limit = req.query.limit ? parseInt(req.query.limit)  : 8 ;                      // "?" means a query is being fired. Agar no limit is provided, then use 8 by default
    let sortBy = req.query.sortBy ? req.query.sortBy  : "_id" ;     

    Product.find()
    .select("-photo")                           //"select" specifies which documents fields to include or exclude. to exclude photos -> "-photo"(minus sign)
    .populate("category")
    .sort([[sortBy, "asc"]])                                     //sorting, filtering the results-> 
    .limit(limit)                                      //kitne products dikhaane hai ek baari mei
    .exec((err, products) => {
        if(err){
            return res.status(400).json({
                error : "No product found"
            });
        }
        res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
    /* the distinct is a query for the distinct operation.
    Passing a callback executes this query */
    Product.distinct("category", {}, (err, category) => {                       
        if(err){
            return res.status(400).json({
                error : "No category found"
            });
        }
        res.json(category);
    });
};


exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {                            //this map will move through every single product(prod)
        //here in each order we have to decrease the stock, and increase the sold amount
        return{
            updateOne : {
                filter : {_id: prod._id},               //using filter to find out the product
                update : {$inc : {stock: -prod.count, sold: +prod.count}}               //performing the updation operation using the increment($inc) variable

            }
        }
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {                    //read docx(mongose js bulkwrite)**/
        if(err){
            return res.status(400).json({
                error : "Bulk operations failed"
            });
        }
        next();
    });
};