const db = require("../../config/db");
const to = require('../../utils/to');
const { v4: uuidv4 } = require('uuid');

let exp = {}


exp.placeOrder = async (req,res) => {
    let err,result;
    let cart_id = uuidv4();
    let items = req.body.items;
    let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let total = 0;
    [err,result] = await to(db.query(
        "insert into Cart values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
         [cart_id, 1, null, total , "Noida", null, false, false, false, false, false, null, timestamp ,timestamp]
    ));
    if(err) return res.sendError(err);
    for(let i = 0 ; i < items.length; i++){
        let prod_id = items[i].prod_id;
        let weight_id = items[i].weight_id;
        let quantity = items[i].quantity;
        for(let j = 0 ; j < weight_id.length; j++){
            console.log(weight_id[j]);
            console.log(prod_id);
            [err,result] = await to(db.query(
                "select * from Weight where weight_id = ? and prod_id = ?",
                [weight_id[j], prod_id]
            ));
            total += quantity[j] * result[0].price;
            if(err) return res.sendError(err);
            [err,result] = await to(db.query(
                "insert into Item(item_id, cart_id, prod_id, weight_id, quantity , price) values(?,?,?,?,?,?)",
                [i+1, cart_id, prod_id, weight_id[j], quantity[j], quantity[j]*result[0].price]
            ));
            if(err) return res.sendError(err);
        }
    }
    [err,result] = await to(db.query(
        "update Cart set total = ? where cart_id = ?",
         [total, cart_id]
    ));
    if(err) return res.sendError(err);
    return res.sendSuccess(null , "Order placed");
};

exp.recieveOrder = async(req,res) => { 
    let err,result;
    let cart_id = req.body.cart_id;
    [err,result] = await to(db.query("update Cart set and isRecieved = true where cart_id = ?", [cart_id]));
    if(err) return res.sendError(err);
    return res.sendSuccess("Order recieved");
};

exp.status = async (req,res) => {
    let err ,result;
    let cart_id = req.body.cart_id;
    [err,result] = await to(db.query(
        "select * from Cart where r_id = ? and cart_id =?" , [req.session.key.r_id, cart_id]
    ));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

exp.fetchAllOrders = async (req,res) => {
    let err ,result;
    [err,result] = await to(db.query(
        "select * from Cart where r_id = ?" , [req.session.key.r_id]
    ));
    if(err) return res.sendError(err);
    return res.sendSuccess(result);
};

module.exports = exp;