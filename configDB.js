const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
const sequelize = new Sequelize('delilahresto', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
  });

 sequelize
    .authenticate()
    .then(() => {
    console.log('Bienvenido a Delilah Resto!');
    }) 
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
  

  module.exports = sequelize;
  
