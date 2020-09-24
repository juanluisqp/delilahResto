const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const sql = require('./../configDB');
const authMiddleware = require('./../middlewares/auth')
const isAdmin = require('./../middlewares/admin')

server.post('/signup', async (req, res) => { //POST de usuario -- USUARIO
    try{
       const { username, full_name, email, phone, address, password} = req.body;
        await sql.query(`
        INSERT INTO users
        (username, full_name, email, phone, address, password, role_id) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?)`,
        {replacements: [username, full_name, email, phone, address, password, 2]});
        res.send({"Mensaje":"usuario creado exitosamente"})
} catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo crear el usuario"
    });
    console.error("No se pudo hacer el post. Error: " + err);
}
});

server.post('/admin', authMiddleware, isAdmin, async (req, res) => { //POST de usuario -- ADMINISTRADOR
    try{
       const { username, full_name, email, phone, address, password, role_id} = req.body;
        await sql.query(`
        INSERT INTO users
        (username, full_name, email, phone, address, password, role_id) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?)`,
        {replacements: [username, full_name, email, phone, address, password, role_id]});
        res.send({"Mensaje":"usuario creado exitosamente"})
} catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo crear el usuario"
    });
    console.error("No se pudo hacer el post. Error: " + err);
}
});

server.patch('/:id', authMiddleware, isAdmin, async (req, res) => { //PATCH de usuario por ID 
    try{
       const { full_name, phone, address, password } = req.body;
        await sql.query(`
            UPDATE users SET
            full_name = ?, 
            phone = ?, 
            address = ?, 
            password = ?
             WHERE user_id = ${req.params.id}`,
        {replacements: [full_name, phone, address, password]});
        
        res.send({"Mensaje":"usuario modificado correctamente"})
} catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo actualizar el usuario"
    });
    
    console.error("No se pudo modificar el usuario. Error: " + err);
}
});

server.delete('/:id', authMiddleware, isAdmin, async (req, res) => { // DELETE de usuarios  
    try{
         await sql.query(
             'DELETE FROM users WHERE user_id = :id',
         {replacements: {id: req.params.id}});
         
         res.send({"Mensaje":"usuario eliminado correctamente"})
 } catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo eliminar el producto"
    });
     
     console.error("No se pudo eliminar el usuario" + err);
 }

})

module.exports = server