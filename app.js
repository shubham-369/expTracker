const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./models/tracker');
const tracker = require('./routes/tracker');


app.use(express.json());
app.use(express.urlencoded({extends:false}));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', tracker);

const port = process.env.PORT || 6060;
sequelize
    .sync()
    .then(() =>{
        app.listen(port);
    })
    .catch(err => console.log('Error while running server : ',err));