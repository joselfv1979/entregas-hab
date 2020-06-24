const bcrypt = require('bcrypt'); // librería de encriptación
const jwt = require('jsonwebtoken'); // librería de cifrado de token
const validator = require("email-validator"); // librería para validar direcciones de emails
const mail = require('../utils/mail_util'); // importación de la función de envío de mails
// importación de la base de datos de pruebas
const bd = require('../bd_mock/user_bd.js');

// función de registro de usuarios nuevos
const register = async (req, res) => {

    // Datos del body de la petición 
    const { name, surname, email, password, role } = req.body;

    // comprobación del paso de parámetros requeridos
    if (!name || !surname || !email || !password || !role) {
        res.status(400).send();
        return;
    }

    // comprobación de dirección de correo válida
    const checkEmail = validator.validate(email);

    if (!checkEmail) {
        res.status(400).send();
        return;
    }

    // comprobación de si ya existe otro usuario registrado con ese email
    if (bd.getUser(email)) {
        res.status(409).send();
        return;
    }
    // encriptación de la password
    const passwordBcrypt = await bcrypt.hash(password, 10);

    // almacenamos (email, passwordBcrypt)
    bd.saveUser(name, surname, email, passwordBcrypt, role);

    // envío del correo de confirmación al usuario
    const message = 'Registro realizado correctamente'
    mail.sendMail(email, message);

    res.send();
}

// función de logueo de usuarios
const login = async (req, res) => {
    const { email, password } = req.body;

    // comprobación del paso de parámetros requeridos
    if (!email || !password) {
        res.status(400).send(); // devolución de error por falta de parámetros
        return;
    }

    const user = bd.getUser(email);
    // comprobación de que existe el usuario por su email
    if (!user) {
        res.status(404).send(); // devolución de error, el usuario no existe
        return;
    }

    // comprobación de que la password es correcta
    const passwordIsvalid = await bcrypt.compare(password, user.password);

    if (!passwordIsvalid) {
        res.status(401).send(); // error de autenticación
        return;
    }

    // objeto que almacena el id y el rol de usuario
    const tokenPayload = { userId: user.userId, role: user.role };

    const userId = tokenPayload.userId;

    // creación del token cifrado a partir del objeto anterior y una clave almacenada en el fichero de variables de entorno '.env'
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
        expiresIn: '1d'
    });

    // envío al usruario del token y su id
    res.json({
        token,
        userId
    })
}
// exportación de las funciones
module.exports = {
    login,
    register
}
