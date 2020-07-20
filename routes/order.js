const router = require("express").Router();
const db = require("../../config/db");
const to = require('../../utils/to');
const { any } = require("joi");

let exp = {}


exp.pushOrder = async(req,res) => { 
    let err,result;
    let cart_id = req.body.cart_id;
    let d_id = req.body.d_id;
    [err,result] = await to(db.query("update Cart set d_id = ? and isProcessed = 1 where cart_id =?", [cart_id]));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.pendingOrders = async(req,res) => { 
    let err,result;
    [err,result] = await to(db.query("select * from Cart where isProcessed=0"));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.rejectedOrders = async(req,res) => { 
    let err,result;
    [err,result] = await to(db.query("select * from Cart where isRejected=1"));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.allOrders = async(req,res) => { 
    let err,result;
    [err,result] = await to(db.query("select * from Cart"));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.cancelOrder =  async(req,res) => { 
    let err,result;
    let cart_id = req.body.cart_id;
    let reason = req.body.reason;
    [err,result] = await to(db.query("update cart set isCancelled=1 and reason = ? where cart_id = ?", [reason , cart_id]));
    if(err) return res.sendError(err);
    return res.sendSuccess("Orderer cancelled");
};


module.exports = exp;

// DROP TABLE IF EXISTS `Item`;
// CREATE TABLE `Item` (
// 	`item_id` INT(11) NOT NULL,
// 	`prod_id` INT(11) NOT NULL,
// 	`quantity` INT NOT NULL,
// 	`price` varchar(255) NOT NULL,
// 	PRIMARY KEY (`item_id`),
// 	FOREIGN KEY (prod_id) references Inventory(prod_id) ON DELETE CASCADE
// );

// DROP TABLE IF EXISTS `Cart`;
// CREATE TABLE `Cart` (
// 	`cart_id` INT(11) NOT NULL AUTO_INCREMENT,
// 	`item_id` INT(11),
// 	`r_id` INT(11) NOT NULL,
// 	`d_id` INT(11) NULL,
// 	`total_price` varchar(255) NOT NULL,
// 	`retailer_location` varchar(255) NOT NULL,
// 	`distributor_location` varchar(255) NULL,
// 	`isProcessed` BINARY NOT NULL,
// 	`isRejected` BINARY NOT NULL,
// 	`isDelivered` BINARY NOT NULL,
// 	`isRecieved` BINARY NOT NULL,
// 	`isCancelled` BINARY NOT NULL, 
// 	`reason` varchar(255) NULL,
// 	`created_at` TIMESTAMP NOT NULL,
// 	`updated_at` TIMESTAMP NOT NULL,
// 	PRIMARY KEY (`cart_id`, `order_id`),
// 	FOREIGN KEY (order_id) references Orders(order_id) ON DELETE CASCADE,
// 	FOREIGN KEY (r_id) references Retailers(r_id) ON DELETE CASCADE,
// 	FOREIGN KEY (d_id) references Distributors(d_id) ON DELETE CASCADE
// );