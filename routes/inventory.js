const db = require("../config/db");
const to = require('../utils/to');
const { v4: uuidv4 } = require('uuid');

let exp = {}

exp.addInventory = async(req,res) => { 
    let prod_id = uuidv4();
    let weights = req.body.weight;
    let prices = req.body.price;
    let name = req.body.name;
    let information = req.body.information;
    let min_quantity = req.body.min_quantity;
    let err, result;
    [err, result] = await to(db.query('insert into Inventory(prod_id, name, information, min_quantity) values(?,?,?,?)', [
        prod_id, name, information, min_quantity
    ]));
    if(err) return res.sendError(err);
    if(weights.length != prices.length) return res.sendError(null , "Weights and Prices not equal");
    for(let i = 0; i < weights.length; i++){
        [err, result] = await to(db.query('insert into Weight(prod_id, weight_id, weight, price) values(?,?,?,?)', [
            prod_id, i+1, weights[i], prices[i]]
        ));
        if(err) return res.sendError(err);
    }
    return res.sendSuccess(null , "Added in inventory");
};

exp.deleteInventory =  async(req,res) => { 
    let err, result;
    let prod_id = req.body.prod_id;
    [err, result] = await to(db.query('delete from Inventory where prod_id = ? ', [
        prod_id
    ]));
    if(err) return res.sendError(err);
    [err , result] = await to(db.query('delete from Weight where prod_id = ?'))
    if(err) return res.sendError(err);
    return res.sendSuccess(null , "Deleted from inventory");
};

exp.getInventory =  async(req,res) => { 
    let err, result;
    let resp = {};
    [err, result] = await to(db.query('select * from Inventory'));
    if(err) return res.sendError(err);
    resp["Inventory"] = result[0];
    let prod_id = result[0].prod_id;
    [err, result] = await to(db.query('select * from Weight where prod_id = ?', prod_id));
    if(err) return res.sendError(err);
    resp["Weights"] = result;
    return res.sendSuccess(resp);
};


module.exports = exp;


// DROP TABLE IF EXISTS `Inventory`;
// CREATE TABLE `Inventory` (
// 	`prod_id` INT(11) NOT NULL AUTO_INCREMENT,
// 	`name` varchar(255) NOT NULL,
// 	`information` varchar(255) NOT NULL,
// 	`min_quantity` INT(11) NOT NULL,
// 	PRIMARY KEY (`prod_id`)
// );

// DROP TABLE IF EXISTS `Weight`;
// CREATE TABLE `Weight` (
// 	`prod_id`  INT(11) NOT NULL,
// 	`weight_id` INT(11) NOT NULL,
// 	`weight` INT(11) NOT NULL,
// 	`price` INT(11) NOT NULL,
// 	PRIMARY KEY (`prod_id` , `weight_id`),
// 	FOREIGN KEY (prod_id) references Inventory(prod_id) ON DELETE CASCADE
// );