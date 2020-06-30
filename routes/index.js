const router = require("express").Router();
const db = require("../config/db");
const to = require("../utils/to");


function hasAccess(access) {
    // 30 - > Admin 
    // 20 -> Distributer 
    // 10 -> Retailer
    return (req, res, next) => {
      if (
        req.session.key &&
        req.session.key.type &&
        req.session.key.type >= access
      )
        return next();
      else res.sendError(null, 'Not Authorized', 401);
    };
}
  
  function isNotLoggedIn(req, res, next) {
    if (!req.session.key) return next();
    else res.redirect('/login');
  }

pong = async(req,res) => {
    return res.sendSuccess('pong');
}; 

router.get('/ping', pong);


module.exports = router;