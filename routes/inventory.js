const router = require("express").Router();
const db = require("../config/db");
const to = require('../utils/to');

let exp = {}

exp.addInventory = async(req,res) => { 
    let prod_id = req.body.prod_id;
    let price = req.body.price;
    let name = req.body.name;
    let information = req.body.information;
    let min_quantity = req.body.min_quantity;
    let err, result;
    [err, result] = await to(db.query('insert into Inventory(prod_id, price, name, infomration, min_quantity) values(?,?,?,?,?)', [
        prod_id, price, name, information, min_quantity
    ]));
    if(err) return res.sendError(err);
    return res.sendSuccess(null , "Added in inventory");
};

exp.updateInventory= async(req,res) => { 
    let err, result;
    let prod_id = req.body.prod_id;
    let price = req.body.price;
    let name = req.body.name;
    let information = req.body.information;
    let min_quantity = req.body.min_quantity;
    [err, result] = await to(db.query('insert into Inventory(prod_id, price, name, infomration, min_quantity) values(?,?,?,?,?)', [
        prod_id, price, name, information, min_quantity
    ]));
    if(err) return res.sendError(err);
    return res.sendSuccess(null , "Updated inventory");
};

exp.deleteInventory =  async(req,res) => { 
    let err, result;
    let prod_id = req.body.prod_id;
    [err, result] = await to(db.query('delete from Inventory where prod_id = ?', [
        prod_id
    ]));
    if(err) return res.sendError(err);
    return res.sendSuccess(null , "Updated inventory");
};
exp.getInventory =  async(req,res) => { 
    let err, result;
    [err, result] = await to(db.query('select * from Inventory'));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};
};

module.exports = exp;