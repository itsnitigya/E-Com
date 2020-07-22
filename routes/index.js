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
const stats = require('./stats');

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

//------Admin------\\
router.post('/a/login', admin_auth.login);
router.post('/a/logout', hasAccess(30), admin_auth.logout);

//Orders
router.post('/a/pushOrder', hasAccess(30), admin_order.pushOrder);
router.post('/a/pendingOrders', hasAccess(30), admin_order.pendingOrders);
router.get('/a/allOrders', hasAccess(30), admin_order.allOrders);
router.post('/a/rejectOrder', hasAccess(30), admin_order.rejectOrder);
router.post('/a/cancelOrder', hasAccess(30), admin_order.cancelOrder);

//Inventory 
router.post('/a/addInventory', hasAccess(30), inventory.addInventory);
router.post('/a/deleteInventory', hasAccess(30), inventory.deleteInventory);
router.get('/a/getInventory',  hasAccess(30), inventory.getInventory);

//Stats for admin panel
router.get('/a/displayRetailers', hasAccess(30), stats.displayRetailers);
router.get('/a/displayDistributors', hasAccess(30), stats.displayDistributors);
router.post('/a/statsRetailers', hasAccess(30), stats.statsRetailers);
router.post('/a/statsDistributors', hasAccess(30), stats.statsDistributors);
//------Admin------\\

//-----Distributor------\\
router.post('/d/signup', distributors_auth.signup);
router.post('/d/login' , distributors_auth.login);
router.post('/d/logout', hasAccess(20), distributors_auth.logout);

//Orders
router.post('/d/acceptOrder', hasAccess(20), distributors_order.acceptOrder);
router.post('/d/declineOrder', hasAccess(20), distributors_order.declineOrder);
router.get('/d/pendingOrders', hasAccess(20), distributors_order.pendingOrders);
router.post('/d/status', hasAccess(20), distributors_order.status);
router.get('/d/fetchAllOrders', hasAccess(20), distributors_order.fetchAllOrders);
//-----Distributor------\\

//------Retailer------\\
router.post('/r/signup', retailers_auth.signup);
router.post('/r/login', retailers_auth.login);
router.post('/r/logout', hasAccess(10), retailers_auth.logout);

//Inventory
router.get('/r/getInventory', hasAccess(10), inventory.getInventory);

//Orders
router.post('/r/order', hasAccess(10), retailer_order.placeOrder);
router.post('/r/recieveOrder', hasAccess(10), retailer_order.recieveOrder);
router.post('/r/status', hasAccess(10), retailer_order.status);
router.post('/r/fetchAllOrders', hasAccess(10), retailer_order.fetchAllOrders);
//------Retailer------\\

module.exports = router;