const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_complete', 'root', 'r333@666m999', {
    dialect : 'mysql'
})
module.exports = sequelize;