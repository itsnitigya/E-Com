const router = require("express").Router();
const db = require("../../config/db");
const to = require('../../utils/to');
const bcrypt = require('bcryptjs');

let exp = {}

exp.signup = async (req,res) => {
    let err, result, salt;
    let email = req.body.email;
    let number =  req.body.number;
    let location = req.body.location;
    let password = req.body.password;
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) return res.sendError(err);
    [err , password] = await to(bcrypt.hash(req.body.password , salt));
    [err , result] = await to(db.query("insert into Retailer(email, number , location, password) values(?,?,?,?)" , [email , number , location , password]));
    if(err)
      return res.sendError(err); 
    return res.sendSuccess(null , "Retailer signed up");
};
  
exp.login = async (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let err , result , userData;
    [err, userData] = await to(db.query("select r_id, email, number, location from Retailer where email = ?" ,[email] ));
    if(userData == null) return res.sendError("Email ID not found");
    if(err) return res.sendError("Email ID not found");
    [err , result] = await to (bcrypt.compare(password, userData[0].password));
    if(result == false) return res.sendError("incorrect email/password")
    req.session.key = userData[0];
    req.session.key.type = 10;
    req.session.save(() => {
      return res.sendSuccess(userData[0]);
    });
};
  
exp.logout = async (req,res) => {
    if (req.session.key)
      req.session.destroy(() => {
        return res.sendSuccess(null, 'logged out');
      });
    return res.sendSuccess(null, 'logged out'); 
};

module.exports = exp;

