const express = require('express');

const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = express.Router();

const auth = require("./middleware/auth");
const authController = require('./controllers/authController');
const marketController = require('./controllers/marketController');
const productController = require('./controllers/productController');

const upload = multer(uploadConfig);

routes.get('/', (req, res) => {
    res.send('this is the starting of a new area');
})

routes.get('/currentUser', auth, authController.current);

routes.post('/createUser',authController.store);

routes.post('/createMarket',upload.single('thumbnail'),marketController.store);
routes.post('/product/:market_id/create',upload.single('thumbnail'),productController.store);
routes.get('/product/:market_id', productController.index);
routes.delete('/product/:product_id', productController.delete);

routes.get('/marketsCategory',marketController.category);
routes.get('/userMarkets', marketController.userMarkets);
routes.get('/markets', marketController.markets);
routes.delete('/deleteMarket',marketController.delete);

routes.post('/authUser',authController.authenticate);

module.exports = routes;
