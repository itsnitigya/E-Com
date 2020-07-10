const router = require("express").Router();
const db = require("../config/db");
const to = require("../utils/to");
const sha = require("sha1");
const bcrypt = require('bcrypt');
const saltRounds = 10;


let exp = {}
  
exp.login = async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body);
    let err , result , userData;
    [err, userData] = await to(db.query("select * from users where email = ?" ,[email]));
    console.log(userData);
    if(userData == null) return res.sendError("email ID not found");
    if(err) return res.sendError("email ID not found");
    [err , result] = await to (bcrypt.compare(password, userData[0].password));
    if(result == false) return res.sendError("incorrect email/password");
    req.session.key = userData[0];
    req.session.key.type = 30;
    req.session.save(() => {
      return res.send(userData);
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
