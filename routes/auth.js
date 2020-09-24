const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const sql = require('./../configDB');
const authMiddleware = require('./../middlewares/auth')
const isAdmin = require('./../middlewares/admin')

server.post('/login', async (req, res) => { // LOGIN
    const { username, password } = req.body;
    console.log(req.body)
    try{
        const data = await sql.query(
            'SELECT a.*, b.name as user_role FROM `users` as a JOIN user_roles b on a.role_id = b.id WHERE username = ? AND PASSWORD = ?',
        {replacements: [username, password],  type: sql.QueryTypes.SELECT}
        );

        if (data.length) {
           const token = jwt.sign({
                username: data[0].username,
                role: data[0].user_role
            }, config.firma)
            

            res.send({
               username: data[0].username,
               token
            }); 
        } else {
            
            res.statusCode = 400
            res.send({
                "mensaje:": "Tu usuario o password no coinciden" 
            })
        }
        
    } catch(err) {
        console.error(err);
    }
})

module.exports = server;