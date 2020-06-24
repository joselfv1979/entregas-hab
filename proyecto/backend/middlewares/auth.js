require('dotenv').config(); // librería para configurar las variables de entorno guardads en el archivo .env

const jwt = require('jsonwebtoken'); // librería que realiza el cifrado del token

// Función middleware de autenticación y autorización 
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

// middleware de autenticación de usuario administrador o proveedor de espacios
const isSpaceProvider = (req, res, next) => {
    const { role } = req.auth;

    if(role === 'spaceProvider' || role === 'admin'){
        next();
    } else {
        res.status(401).send();
    }     
}

// middleware de autenticación de usuario administrador o buscador de espacios
const isSpaceSeeker = (req, res, next) => {
    const { role } = req.auth;
    
    if(role === 'spaceSeeker' || role === 'admin'){
        next();
    } else {
        res.status(401).send();
    }     
}

module.exports = {   // exportación de middlewares
    isAuthenticated,
    isSpaceProvider,
    isSpaceSeeker
};
