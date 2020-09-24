const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const sql = require('./../configDB');
const authMiddleware = require('./../middlewares/auth')
const isAdmin = require('./../middlewares/admin')

server.get('/', authMiddleware, isAdmin, async (req,res) => { // GET de ordenes 
    try {
    const data = await sql.query('SELECT c.name estado, a.created_at hora, a.order_id numero_orden, e.product_name descripcion, f.name pago, b.full_name usuario, b.address direccion FROM `orders` as a JOIN users b ON a.user_id = b.user_id JOIN orders_status c ON a.status_id = c.order_status_id JOIN orders_products d ON d.order_id = a.order_id JOIN products e on e.product_id = d.product_id JOIN payment_method f ON f.payment_method_id = a.payment_method_id', { type: sql.QueryTypes.SELECT })
    res.send(data)
} catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo obtener la informacion"
    });
    console.error("no se puedo hacer el get. Error: " + err)
}
})

server.get('/:id', authMiddleware, isAdmin, async (req,res) => { // GET de ordenes por ID
    try {
    const data = await sql.query(`SELECT c.name estado, a.created_at hora, a.order_id numero_orden, e.product_name descripcion, f.name pago, b.full_name usuario, b.address direccion FROM orders as a JOIN users b ON a.user_id = b.user_id JOIN orders_status c ON a.status_id = c.order_status_id JOIN orders_products d ON d.order_id = a.order_id JOIN products e on e.product_id = d.product_id JOIN payment_method f ON f.payment_method_id = a.payment_method_id WHERE a.order_id = ${req.params.id}`, { type: sql.QueryTypes.SELECT })
    if (data.length > 0) {
        res.send(data)
    } else {
        res.send({"mensaje": "No hay datos para este numero de orden"})
    }
} catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo obtener la informacion"
    });
    console.error("no se puedo hacer el get. Error: " + err)
}
})

server.post('/',authMiddleware, async (req, res) => { //POST de ordenes
    try {      
        const paymentMethod = Object.values(req.body[0])[0];    
        const user = Object.values(req.body[1])[0];
        await sql.query(`
            INSERT INTO orders
            (payment_method_id, status_id, user_id)
            VALUES 
            (?, ?, ?)`,
            {replacements: [paymentMethod, 1, user]} // El valor 1 indica que la orden es nueva
            );           
        const data = await sql.query('SELECT MAX(order_id) FROM orders ', { type: sql.QueryTypes.SELECT })
        const last_order = Object.values(data[0])[0]
        async function insertProduct(product,index,array) {
            await sql.query(`
                INSERT INTO orders_products
                (order_id, product_id)
                VALUES 
                (?, ?)`,
                {replacements: [last_order, product.product_id]}
            );
        };
        req.body.forEach(insertProduct);
        res.send({"Mensaje":"Orden generada correctamente"})
} catch(err) {
    res.statusCode = 400
    console.log(err)
}
})

server.delete('/:id', authMiddleware, isAdmin, async (req, res) => { // DELETE de productos
    try{
         await sql.query(
             'DELETE FROM orders WHERE order_id = :id',
         {replacements: {id: req.params.id}});
         
         res.send({"Mensaje":"Producto eliminado correctamente"})
 } catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo eliminar la orden"
    });
     
     console.error("No se pudo eliminar la orden" + err);
 }

})

server.put('/:id', authMiddleware, isAdmin, async (req, res) => { //PUT de productos por ID
    try{
       const { payment_method_id, status_id } = req.body;
        await sql.query(`
            UPDATE orders SET
            payment_method_id = ?,
            status_id = ?
            WHERE order_id = ${req.params.id}`,
        {replacements: [payment_method_id,status_id]});
        
        res.send({"Mensaje":"Orden modificada correctamente"})
} catch(err) {
    res.statusCode = 400
    res.send({
        message: "No se pudo actualizar la orden"
    });
    
    console.error("No se pudo modificar la orden Error: " + err);
}
});
module.exports = server


