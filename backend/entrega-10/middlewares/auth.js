require('dotenv').config(); // librería que implementa las variables de entorno

const jwt = require('jsonwebtoken'); // librería que realiza el cifrado del token

// Función middelware de autenticación y autorización 
const isAuthenticated = (req, res, next) => {
    const { authorization } = req.headers; // El token debe ir en el campo authorization de los headers

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        req.auth = decodedToken; // verificación del token

    } catch(e) {
        const authError = new Error('invalid token');
        authError.status = 401; // Error por token inválido
        return next(authError);
    }

    next();
}

module.exports = {
    isAuthenticated
};
