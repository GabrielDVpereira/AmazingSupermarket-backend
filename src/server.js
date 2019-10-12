const express = require('express'); 
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');


//user config module to get the privateKey, if it's not set, end the application

mongoose
    .connect('mongodb+srv://market:market@cluster0-xyeyc.mongodb.net/market?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(()=>console.log("Connect to MongoDB"))
    .catch(err => console.error('could not connect to MongoDB'));



app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 3333);