const {Order, ProductCart} = require("../models/order");                    //as we have created both of these in our order model



exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")             //we'll also populate this reques with the name and the actual price of the product(will be clear when we'll work on the frontend)
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error : "No order found matching your requested id"
            });
        }
        req.order = order;                  //populating the req.order by the order given to us
        next();
    });
};

exports.createOrder = (req, res, next, id) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if(err){
            return res.status(400).json({
                error : "Failed to save your order in DB"
            });
        }
        res.json(order);
    });
};


exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
        if(err){
            return res.status(400).json({
                error : "No orders found in DB"
            });
        }
        res.json(orders);
    });
};


exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
    // /* In the order schema, look for the enum value in the order status of this order */
};


exports.updateStatus = (req, res) => {
    Order.update(
        {_id : req.body.orderId},
        {$set : {status : req.body.status}},
        (err, order) => {
            if(err){
                return res.status(400).json({
                    error : "Cannot update order status"
                });
            }
            res.json(order);
        }
    )
};