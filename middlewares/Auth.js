const jwt = require('jsonwebtoken');
const config = require('./../config')

const showError = (res) => {
    res.statusCode = 401
    res.send({
    status: 401,
    message: "No estas autorizado para obtener esta informacion"
    })
}


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization 

    if (!authHeader) {
        showError(res)
        
    }
    const token = authHeader && req.headers.authorization.split(' ')[1];
    const authData = jwt.verify(token, config.firma);

    res.locals.isAdmin = authData.role
    
    
    if (authData) {
       return next();
    }

    showError(res)
}