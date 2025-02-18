const db = require("../config/db");
const to = require('../utils/to');

let exp = {}

exp.displayRetailers = async(req,res) => {
    let err, result;
    [err,result] = await to(db.query("select r_id, email, number, location  from Retailer"));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.displayDistributors = async(req,res) => {
    let err, result; 
    [err,result] = await to(db.query("select d_id, email, number, location  from Distributor"));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
}

exp.statsRetailers = async(req,res) => {
    let err , result;
    let r_id = req.body.r_id;
    let resp = {};
    [err,result] = await to(db.query("select count(*) as TotalOrders from Cart where r_id = ? " , [r_id]));
    if(err) return res.sendError(err);
    resp["orders_total"] = result[0].TotalOrders;
    [err,result] = await to(db.query("select count(*) as RecievedOrders from Cart where r_id = ? and isRecieved = true" , [r_id]));
    if(err) return res.sendError(err);
    resp["orders_recieved"] = result[0].RecievedOrders;
    [err,result] = await to(db.query("select SUM(total) as TotalPrice from Cart where r_id = ? and isRecieved = true" , [r_id]));
    resp["total_sales"] = result[0].TotalPrice;
    if(err) return res.sendError(err);
    return res.sendSuccess(resp);
}

exp.statsDistributors = async(req,res) => {
    let err , result;
    let d_id = req.body.d_id;
    let resp = {};
    [err,result] = await to(db.query("select count(*) as TotalOrders from Cart where d_id = ? " , [d_id]));
    if(err) return res.sendError(err);
    resp["orders_total"] = result[0].TotalOrders;
    [err,result] = await to(db.query("select count(*) as RecievedOrders from Cart where d_id = ? and isRecieved = true" , [d_id]));
    if(err) return res.sendError(err);
    resp["orders_recieved"] = result[0].RecievedOrders;
    [err,result] = await to(db.query("select count(*) as RejectedOrders from Cart where d_id = ? and isRejected = true" , [d_id]));
    if(err) return res.sendError(err);
    resp["orders_rejected"] = result[0].RejectedOrders;
    return res.sendSuccess(resp);
}


module.exports = exp;