const router = require("express").Router();
const db = require("../../config/db");
const to = require('../../utils/to');

let exp = {}


exp.acceptOrder = async(req,res) => {
    let cart_id = req.body.cart_id;
    let err ,result;
    [err,result] = await to(db.query(
        "update Cart set isDelivered = true where cart_id = ? and d_id = ?" , [cart_id , req.session.key.r_id]
    ));
    if(err) return res.sendError(err);
    return res.sendSuccess(null, "Order accepted");
};

exp.declineOrder = async(req,res) => {
    let cart_id = req.body.cart_id;
    let reason = req.body.reason;
    let err ,result;
    [err,result] = await to(db.query(
        "update Cart set isRejected = true and reason = ? where cart_id = ? and d_id = ?" , [reason,  cart_id , req.session.key.r_id]
    ));
    if(err) return res.sendError(err);
    return res.sendSuccess(null, "Order declined");
};

exp.pendingOrders = async (req,res) => {
    let err ,result;
    [err,result] = await to(db.query(
        "select * from cart where d_id = ? and isDelivered = false" , [req.session.key.r_id]
    ));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.status = async (req,res) => {
    let err ,result;
    let cart_id = req.body.cart_id;
    [err,result] = await to(db.query(
        "select * from Cart where d_id = ? and cart_id = ?" , [req.session.key.r_id, cart_id]
    ));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.fetchAllOrders = async (req,res) => {
    let err ,result;
    [err,result] = await to(db.query(
        "select * from Cart where d_id = ?" , [req.session.key.d_id]
    ));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};


module.exports = exp;
