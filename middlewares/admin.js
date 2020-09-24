module.exports = (req, res, next) => {
    const isAdmin = res.locals.isAdmin // TODO: verificar si esta logeado
    
    if (isAdmin === "Administrador") {
       return next();
    }

    res.statusCode = 401
    res.send({
        status: 401,
        message: "Se requiere un administrador para realizar esta tarea"
    })
}