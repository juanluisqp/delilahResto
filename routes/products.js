const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const sql = require('./../configDB');
const authMiddleware = require('./../middlewares/auth')
const isAdmin = require('./../middlewares/admin')

server.get('/', authMiddleware, async (req,res) => { // GET de productos 
    try {
    const data = await sql.query('SELECT * FROM products', { type: sql.QueryTypes.SELECT })
    res.send(data)
} catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo obtener la informacion"
    });
    console.error("no se puedo hacer el get. Error: " + err)
}
})

server.get('/:id', authMiddleware, async (req,res) => { // GET de productos por ID
    try {
    const data = await sql.query(`SELECT * FROM products WHERE product_id = ${req.params.id}`, { type: sql.QueryTypes.SELECT })
    if (data.length > 0) {
        res.send(data)
    } else {
        res.statusCode = 404
        res.send({"mensaje": "No hay datos para este numero de producto"})
    }
} catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo obtener la informacion"
    });
    console.error("no se puedo hacer el get. Error: " + err)
}
})

server.post('/', authMiddleware, isAdmin, async (req, res) => { //POST de productos
    try{
       const { product_name, price } = req.body;
        await sql.query(`
        INSERT INTO products
        (product_name, price)
        VALUES 
        (?, ?)`,
        {replacements: [product_name, price]});
        
        res.send({"Mensaje":"Producto agregado correctamente"})
} catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo crear el producto"
    });
    console.error("No se pudo hacer el post. Error: " + err);
}
});

server.put('/:id', authMiddleware, isAdmin, async (req, res) => { //PUT de productos por ID
    try{
       const { product_name, price } = req.body;
        await sql.query(`
            UPDATE products SET
            product_name = ?,
            price = ?
            WHERE product_id = ${req.params.id}`,
        {replacements: [product_name, price]});
        
        res.send({"Mensaje":"Producto modificado correctamente"})
} catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo actualizar el producto"
    });
    
    console.error("No se pudo modificar el producto. Error: " + err);
}
});

server.delete('/:id', authMiddleware, isAdmin, async (req, res) => { // DELETE de productos
    try{
         await sql.query(
             'DELETE FROM PRODUCTS WHERE product_id = :id',
         {replacements: {id: req.params.id}});
         
         res.send({"Mensaje":"Producto eliminado correctamente"})
 } catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo eliminar el producto"
    });
     
     console.error("No se pudo eliminar el producto" + err);
 }

})

module.exports = server

