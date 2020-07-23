const db = require("../config/db");
const to = require('../utils/to');
const { any } = require("joi");

let exp = {}

exp.pushOrder = async(req,res) => { 
    let err,result,dist;
    let cart_id = req.body.cart_id;
    let d_id = req.body.d_id;
    [err, dist] = await to(db.query("select * from Distributor where d_id = ?", d_id ));
    [err,result] = await to(db.query("update Cart set d_id=? , isProcessed=true , distributor_location=? where cart_id=?", [d_id , dist[0].location, cart_id]));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.pendingOrders = async(req,res) => { 
    let err,result;
    [err,result] = await to(db.query("select * from Cart where isProcessed=false"));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.rejectedOrder = async(req,res) => { 
    let err,result;
    [err,result] = await to(db.query("select * from Cart where isRejected=true"));
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
    [err,result] = await to(db.query("update cart set isCancelled=true , reason = ? where cart_id = ?", [reason , cart_id]));
    if(err) return res.sendError(err);
    return res.sendSuccess("Orderer cancelled");
};

module.exports = exp;

