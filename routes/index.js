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

// pong = async(req,res) => {
//   let result, err;
//   console.log(result);
//   db.getConnection(async function(err,connection){
//     if (err) {
//       connection.release();
//       throw err;
//     }   
//     connection.query(query,function(err,rows){
//             connection.release();
//             if(!err) {
//                 callback(null, {rows: rows});
//             }           
//         });
//     console.log(result);
// });
//   return res.sendSuccess(result);
//   // db.beginTransaction(function(err) {
//   //   if (err) { throw err; }
//   //   db.query('select * from Cart', function (error, results, fields) {
//   //     if (error) {
//   //       return db.rollback(function() {
//   //         throw error;
//   //       });
//   //     }  
//   //     db.query('select * from Cart', function (error, results, fields) {
//   //       if (error) {
//   //         return connection.rollback(function() {
//   //           throw error;
//   //         });
//   //       }
//   //       db.commit(function(err) {
//   //         if (err) {
//   //           return db.rollback(function() {
//   //             throw err;
//   //           });
//   //         }
//   //         console.log('success!');
//   //       });
//   //     });
//   //   });
//   // });
// }; 

//Testing
// router.get('/ping', pong);

//------Admin------\\
router.post('/a/login', admin_auth.login); //tested
router.post('/a/logout', hasAccess(30), admin_auth.logout); //tested

//Orders
router.post('/a/pushOrder', hasAccess(30), admin_order.pushOrder);  //tested
router.get('/a/pendingOrders', hasAccess(30), admin_order.pendingOrders);  //tested
router.get('/a/allOrders', hasAccess(30), admin_order.allOrders);  //tested
router.get('/a/rejectedOrder', hasAccess(30), admin_order.rejectedOrder);  //tested
router.post('/a/cancelOrder', hasAccess(30), admin_order.cancelOrder);  //tested

//Inventory 
router.post('/a/addInventory', hasAccess(30), inventory.addInventory); //tested
router.post('/a/deleteInventory', hasAccess(30), inventory.deleteInventory); //tested
router.get('/a/getInventory',  hasAccess(30), inventory.getInventory); //tested

//Stats for admin panel
router.get('/a/displayRetailers', hasAccess(30), stats.displayRetailers); //tested
router.get('/a/displayDistributors', hasAccess(30), stats.displayDistributors); //tested
router.post('/a/statsRetailers', hasAccess(30), stats.statsRetailers); //tested
router.post('/a/statsDistributors', hasAccess(30), stats.statsDistributors); //tested
//------Admin------\\

//-----Distributor------\\
router.post('/d/signup', distributors_auth.signup); //tested
router.post('/d/login' , distributors_auth.login); //tested
router.post('/d/logout', hasAccess(20), distributors_auth.logout); //tested

//Orders
router.post('/d/acceptOrder', hasAccess(20), distributors_order.acceptOrder);
router.post('/d/declineOrder', hasAccess(20), distributors_order.declineOrder);
router.get('/d/pendingOrders', hasAccess(20), distributors_order.pendingOrders);
router.post('/d/status', hasAccess(20), distributors_order.status);
router.get('/d/fetchAllOrders', hasAccess(20), distributors_order.fetchAllOrders);
//-----Distributor------\\

//------Retailer------\\
router.post('/r/signup', retailers_auth.signup); //tested
router.post('/r/login', retailers_auth.login); //tested
router.post('/r/logout', hasAccess(10), retailers_auth.logout); //tested

//Inventory
router.get('/r/getInventory', hasAccess(10), inventory.getInventory); //tested

//Orders
router.post('/r/order', hasAccess(10), retailer_order.placeOrder);  //tested
router.post('/r/recieveOrder', hasAccess(10), retailer_order.recieveOrder);  //tested
router.post('/r/status', hasAccess(10), retailer_order.status);  //tested
router.get('/r/fetchAllOrders', hasAccess(10), retailer_order.fetchAllOrders);  //tested
//------Retailer------\\

module.exports = router;