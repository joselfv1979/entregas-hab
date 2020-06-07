const bcrypt = require('bcrypt'); // librería de encriptación
const jwt = require('jsonwebtoken'); // librería para cifrar los tokens

const usr = 'admin'; // usuario previo creado con su password encriptado
const passwd = '$2b$10$UhT47YOiBPXM0QcHQGCfB.SOihQOy900RJ2Yqf7qZzsoAGwTQOJ0y';

// función de logueo o autenticación
const login = async (req, res) => {
    const { user, password } = req.body; // El usuario debe pasar su nombre de usuario y password en el body de la petición, si falta alguno el server devuelve error 400 por falta de parámetors
    if (!user || !password) {
        res.status(400).send();
        return;
    }
    
    if (user !== usr) { // Comprobación de usuario válido
        res.status(404).send(); 
        return;
    }

    const passwordIsvalid = await bcrypt.compare(password, passwd);

    if (!passwordIsvalid) { // comprobación de password correcta
        res.status(401).send(); // Error de autenticación
        return;
    }

    const tokenPayload = { user }; // Creación del token
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
        expiresIn: '1d' // Cifrado y configuración de validez del token por 1 día
    });

    res.json({
        token // entrega del token en la respuesta del servidor
    })
}

module.exports = {
    login
}