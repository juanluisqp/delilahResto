const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const sql = require('./configDB');
const jwt = require('jsonwebtoken');
const config = require('./config')

//Middlewares
const authMiddleware = require('./middlewares/auth')
const isAdmin = require('./middlewares/admin')

//Para que funcione el bodyParser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));

const productsRoutes = require('./routes/products')
const authRoutes = require('./routes/auth')
const ordersRoutes = require('./routes/ordenes')
const usersRoutes = require('./routes/users')

server.use('/productos', productsRoutes);
server.use('/auth', authRoutes);
server.use('/ordenes', ordersRoutes);
server.use('/users', usersRoutes);

server.listen(3000, () => {
    console.log('servidor iniciado...');
});





