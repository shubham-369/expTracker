const express = require('express');
const Router = express.Router();
const controller = require('../controllers/tracker');

Router.post('/data', controller.create);
Router.get('/form', controller.getformdata);
// Router.get('/form', controller.getdata);
Router.get('/delete/:delID', controller.delete);
Router.get('/edit/:editID', controller.edit);

module.exports = Router;