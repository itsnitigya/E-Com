const router = require("express").Router();
const db = require("../config/db");
const to = require("../utils/to");
const retailers_auth = require('../routes/Retailers/index');
const distributes_auth = require('../routes/Distributers/index');
const admin_auth = require('./auth');
const inventory = require('./inventory');

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
  else return res.redirect('/login');
}

pong = async(req,res) => {
    return res.sendSuccess('pong');
}; 

//Testing
router.get('/ping', pong);

//Admin routes
router.post('/a/login' , admin_auth.login);
router.post('/a/logout' , admin_auth.logout);

//Inventory routes
router.post('/a/addInventory' , inventory.addInventory);
router.post('/a/deleteInventory' , inventory.deleteInventory)
router.post('/a/updateInventory' , inventory.updateInventory);
router.get('/a/getInventory' , inventory.getInventory);

//Distributors 
router.post('/d/signup' , distributes_auth.signup);
router.post('/d/login' , distributes_auth.login);
router.post('/d/logout' , distributes_auth.logout);

//Retailers
router.post('/r/signup' , retailers_auth.signup);
router.post('/r/login' , retailers_auth.login);
router.post('/r/logout' , retailers_auth.logout);

module.exports = router;