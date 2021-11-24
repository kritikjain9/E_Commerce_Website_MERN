const Category = require("../models/category");

//our middleware
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if(err){
            return res.status(400).json({
                error: "Category not found in DB"
            });
        }
        //if no error, then we'll populate a request object by the "cate"
        req.category = cate;
        next();
    });
};



exports.createCategory = (req, res) => {
    //we will create a simple category, by extracting it from the user
    const category = new Category(req.body);        //creating a new category object from the category class

    //using the newly created category object
    category.save((err, category) => {
        if(err){
            return res.json({
                error : "NOT able to save category in DB"
            });
        }
        res.json({category});
    });
}

exports.getCategory = (req, res) => {
    //if you want just a single category, then just populate it from the req.category
    return res.json(req.category);
};


exports.getAllCategory = (req, res) => {
    //to find all categories(remember the assignment?)
    Category.find()
    .exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error : "NO categories found"
            });
        }
        res.json(categories);
    });
    // return res("response aa gyaa");
};


exports.updateCategory = (req, res) => {
    //grab the category that you wanna update. we are able to grab this becoz of the middleware that we created "getCategoryById"
    const category = req.category;
    
    //we only want to change the name of this category, by the name sent from the frontend/postman
    category.name = req.body.name;
    
    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error : "Failed to update the category"
            });
        }
        res.json(updatedCategory);
    });
};


exports.removeCategory = (req, res) => {
    const category = req.category;

    //remove is an operation of mongoose, and since we are interacting directly with the DB, we get two things-> error or the category itself
    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                error : "Failed to delete the category"
            });
        }
        res.json({
            message: `Succesfully Deleted the \" ${category.name} \" category`
        });
    });
    
}