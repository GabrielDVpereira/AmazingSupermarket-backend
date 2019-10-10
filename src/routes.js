const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('this is the starting of a new area');
})

module.exports = routes;