const router = require("express").Router();
const db = require("../../config/db");
const to = require('../../utils/to');

let exp = {}

exp.getLedger = async(req , res) => {
   let err,result;
   [err,result] = await to(db.query("select * from Ledger"));
   if(err) return res.sendError(err);
   return res.sendSuccess(result);
}

exp.updateLedger = async(req , res) => {
    let err,result;
    let cart_id = req.body.cart_id;
    let query = req.params.operation;
    if(query == 'delete'){
        [err,result] = await to(db.query("delete from Ledger where cart_id = ?", [cart_id]));
        if(err){
            res.sendError(err);
        }
    }
    if(query == 'update'){
        let total = req.body.total;
        [err,result] = await to(db.query("update Ledger set total = ? where cart_id = ?", [total , cart_id]));
        if(err){
            res.sendError(err);
        }
    }
    return res.sendSuccess(null , "Ledger updated");
}

async function insertLedger(){

}

module.exports = exp;

