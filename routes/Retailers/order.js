const router = require("express").Router();
const db = require("../../config/db");
const to = require('../../utils/to');

let exp = {}


exp.order = async (req,res) => {
    let err,result;
    let prods = req.body.order;
    let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let item_id =  sha256(timestamp + req.session.key.r_id);
    for(var i = 0; i < prods.length ; i++){
        [err,result] = await to(db.query(
            "insert into Cart where values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [cart_id , i , req.session.key.r_id , NULL, req.session.key.location,
                NULL , 0 , 0 , 0  , 0 , NULL , timestamp , timestamp
            ]
        ));
        if(err) return res.sendError(err);
        [err,result] = await to(db.query(
            "insert into Orders where values(?,?,?,?)", [cart_id , i , prods[i].id , prods[i].quantinty]
        ));
        if(err) return res.sendError(err);
        //update
    }
    return res.sendSuccess(null , "Order placed");
};

exp.recieveOrder = async(req,res) => { 
    let err,result;
    let cart_id = req.body.cart_id;
    [err,result] = await to(db.query("update Cart set and isRecieved = 1 where cart_id =?", [cart_id]));
    if(err) return res.sendError(err);
    return res.sendSuccess("Order recieved");
};

exp.status = async (req,res) => {
    let err ,result;
    [err,result] = await to(db.query(
        "select * from cart where r_id = ?" , [req.session.key.r_id]
    ));
    if(err) return res.sendError(err);
    let resp = {}
    for(var i = 0 ; i < result.length; i++){
        let cart_id = result[i].cart_id;
        let Carts;
        let Orders;
        [err,Carts] = await to(db.query("select * from Cart where cart_id = ?" , [cart_id]));
        // handle data here
        if(err) return res.sendError(err);
        for(var i = 0 ; i < Carts.length; i++){
            [err,Orders] = await to(db.query("select * from Orders where cart_id = ? and order_id = ?" , [cart_id , Carts[i].order_id]));
            if(err) return res.sendError(err);
        }
        [err,Orders] = await to(db.query("select * from Orders where cart_id = ?" , [cart_id]));
        if(err) return res.sendError(err);
    }
    return res.sendSuccess(null , "Retailer Status Received");
};

// DROP TABLE IF EXISTS `Orders`;
// CREATE TABLE `Orders` (
//  `cart_id` varchar(255) NOT NULL UINIQUE,
// 	`order_id` INT(11) NOT NULL,
// 	`prod_id` INT(11) NOT NULL,
// 	`quantity` INT NOT NULL,
//  PRIMARY KEY (`cart_id`, `order_id`),
//  FOREIGN KEY (cart_id) references Cart(cart_id) ON DELETE CASCADE,
// 	FOREIGN KEY (prod_id) references Inventory(prod_id) ON DELETE CASCADE,
// );

// DROP TABLE IF EXISTS `Cart`;
// CREATE TABLE `Cart` (
// 	`cart_id` varchar(255) NOT NULL UINIQUE,
// 	`order_id` INT(11),
// 	`r_id` INT(11) NOT NULL,
// 	`d_id` INT(11) NULL,
// 	`retailer_location` varchar(255) NOT NULL,
// 	`distributor_location` varchar(255) NULL,
// 	`isProcessed` BINARY NOT NULL,
// 	`isDelivered` BINARY NOT NULL,
// 	`isRejected` BINARY NOT NULL,
// 	`isCanceled` BINARY NOT NULL,
// 	`Reason` varchar(255) NULL,
// 	`timestamp` TIMESTAMP NOT NULL,
// 	PRIMARY KEY (`cart_id`, `order_id`),
// 	FOREIGN KEY (order_id) references Orders(order_id) ON DELETE CASCADE,
// 	FOREIGN KEY (r_id) references Retailers(r_id) ON DELETE CASCADE,
// 	FOREIGN KEY (d_id) references Distributers(d_id) ON DELETE CASCADE
// );

// DROP TABLE IF EXISTS `Ledger`;
// CREATE TABLE `ledger` (
// 	`order_id` INT(11) NOT NULL,
// 	`prod_id` INT(11) NOT NULL,
// 	`total` FLOAT NOT NULL,
// 	`timestamp` TIMESTAMP NOT NULL,
// 	FOREIGN KEY (order_id) references Orders(order_id) ON DELETE CASCADE,
// 	FOREIGN KEY (prod_id) references Inventory(prod_id) ON DELETE CASCADE
// );
