const path = require('path');

const express = require('express');
const app = express(); //this is a function that returns an object


var cors = require('cors');

app.use(cors());


const bodyParser = require('body-parser');



const sequelize = require('./util/database');

const formRoute = require('./routes/form');

app.use(formRoute);
app.use(bodyParser.urlencoded({ extended: false }));


sequelize.sync().then(result => {//this will create the tables in the database from all the models defined in the sequelize object

    //console.log(result);
    app.listen(4000, () => {
        console.log('server is running');
    });
}).catch(err=>console.log(err));