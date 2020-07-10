const router = require("express").Router();
const db = require("../../config/db");
const to = require('../../utils/to');
const { any } = require("joi");

let exp = {}

exp.displayRetailers = async(req,res) => {
    let err, result;
    [err,result] = await to(db.query("select * from Retailers"));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.displayDistributors = async(req,res) => {
    let err, result; 
    [err,result] = await to(db.query("select * from Distributors"));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
}

//add more statssssss
exp.statsRetailers = async(req,res) => {
    let err , result;
    let r_id = req.body.r_id;
    let resp = {};
    [err,result] = await to(db.query("select count(*) as TotalOrders from Cart where r_id = ? " , [r_id]));
    if(err) return res.sendError(err);
    resp["orders_total"] = result[0].TotalOrders;
    [err,result] = await to(db.query("select count(*) as RecievedOrders from Cart where r_id = ? and isRecieved = 1" , [r_id]));
    if(err) return res.sendError(err);
    resp["orders_recieved"] = result[0].RecievedOrders;
    //something to do with total
    [err,result] = await to(db.query("select sum(total) as from Cart where r_id = ? and isRecieved = 1" , [r_id]));
    if(err) return res.sendError(err);
    return res.sendSuccess(JSON.stringify(resp));
}

exp.statsDistributors = async(req,res) => {
    let err , result;
    let d_id = req.body.d_id;
    let resp = {};
    [err,result] = await to(db.query("select count(*) as TotalOrders from Cart where d_id = ? " , [d_id]));
    if(err) return res.sendError(err);
    resp["orders_total"] = result[0].TotalOrders;
    [err,result] = await to(db.query("select count(*) as RecievedOrders from Cart where d_id = ? and isRecieved = 1" , [d_id]));
    if(err) return res.sendError(err);
    resp["orders_recieved"] = result[0].RecievedOrders;
    [err,result] = await to(db.query("select count(*) as RejectedOrders from Cart where d_id = ? and isRejected = 1" , [d_id]));
    if(err) return res.sendError(err);
    resp["orders_rejected"] = result[0].RejectedOrders;
    return res.sendSuccess(JSON.stringify(resp));
}


module.exports = exp;


// DROP TABLE IF EXISTS `Retailers`;
// CREATE TABLE `Retailers` (
// 	`r_id` INT(11) NOT NULL AUTO_INCREMENT,
// 	`email` varchar(255) UNIQUE,
// 	`number` INT(11) UNIQUE,
// 	`location` varchar(255) NOT NULL,
// 	`password` varchar(255) NOT NULL,
// 	PRIMARY KEY (`r_id`)
// );

// DROP TABLE IF EXISTS `Distributors`;
// CREATE TABLE `Distributors` (
// 	`d_id` INT(11) NOT NULL AUTO_INCREMENT,
// 	`email` varchar(255) UNIQUE,
// 	`number` INT(11) UNIQUE,
// 	`location` varchar(255) NOT NULL,
// 	`password` varchar(255) NOT NULL,
// 	PRIMARY KEY (`d_id`)
// );