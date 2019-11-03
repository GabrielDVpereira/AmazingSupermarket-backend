const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


//user config module to get the privateKey, if it's not set, end the application
const Dblocal = "mongodb://localhost/market";
const DbAtlas = 'mongodb+srv://market:market@cluster0-xyeyc.mongodb.net/market?retryWrites=true&w=majority';
mongoose
    .connect(Dblocal, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(()=>console.log("Connect to MongoDB"))
    .catch(err => console.error('could not connect to MongoDB ' + err));


app.use(cors())
app.use(express.json());
 //Forma como o express retorna arquivos estáticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);
app.listen(process.env.PORT || 3333);
    
