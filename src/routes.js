const express = require('express');
const routes = express.Router();
const auth = require("./middleware/auth");
const authController = require('./controllers/authController');

routes.get('/', (req, res) => {
    res.send('this is the starting of a new area');
})

routes.get('/currentUser', auth, authController.current);

routes.post('/createUser',authController.store);

routes.get('/authUser',authController.authenticate);

module.exports = routes;