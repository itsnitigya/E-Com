const router = require("express").Router();
const db = require("../config/db");
const to = require("../utils/to");
const retailers_auth = require('./Retailers/index');
const distributors_auth = require('./Distributors/index');
const admin_auth = require('./auth');
const inventory = require('./inventory');
const retailer_order = require('../routes/Retailers/order');
const admin_order = require('./order');
const distributors_order = require('../routes/Distributors/order');

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

//------Admin------
router.post('/a/login' , admin_auth.login);
router.post('/a/logout' , admin_auth.logout);

//Order routes
router.post('/a/pushOrder' , admin_order.pushOrder);
router.post('/a/pendingOrders' , admin_order.pendingOrders);
router.get('/a/allOrders' , admin_order.allOrders);
router.post('/a/rejectOrder' , admin_order.rejectOrder);
router.post('/a/cancelOrder' , admin_order.cancelOrder);

//Inventory routes
router.post('/a/addInventory' , inventory.addInventory);
router.post('/a/deleteInventory' , inventory.deleteInventory);
router.get('/a/getInventory' , inventory.getInventory);



//-----Distributor------
router.post('/d/signup' , distributors_auth.signup);
router.post('/d/login' , distributors_auth.login);
router.post('/d/logout' , distributors_auth.logout);

router.post('/d/acceptOrder' , distributors_order.acceptOrder);
router.post('/d/declineOrder' , distributors_order.declineOrder);
router.get('/d/pendingOrders' , distributors_order.pendingOrders);
router.post('/d/status' , distributors_order.status);
router.get('/d/fetchAllOrders' , distributors_order.fetchAllOrders);



//------Retailer------
router.post('/r/signup' , retailers_auth.signup);
router.post('/r/login' , retailers_auth.login);
router.post('/r/logout' , retailers_auth.logout);

//Inventory routes
router.get('/r/getInventory' , inventory.getInventory);

router.post('/r/order' , retailer_order.placeOrder);
router.post('/r/recieveOrder' , retailer_order.recieveOrder);
router.post('/r/status' , retailer_order.status);
router.post('/r/fetchAllOrders' , retailer_order.fetchAllOrders);

module.exports = router;