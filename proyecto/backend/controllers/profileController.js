const validator = require("email-validator"); // librería para validar direcciones de emails
const bd = require('../bd_mock/user_bd.js'); // bd de pruebas

// función para obtener el perfil de un usuario a través del id de usuario
const getProfile = (req, res) => {
    
    const { id } = req.params;
    // comprobación de que el existe el usuario según el id pasado en url de la petición
    const user = bd.getUserById(parseInt(id));

    if (!user) {
        res.status(404).send(); // devolución de error, el usuario no existe
        return;
    }
    // objeto usuario sin el campo password, que devolvemos al usuario
    const newUser = {
        userId: user.userId,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role
    }

    res.json(newUser);
}

// función para editar el perfil de un usuario
const editProfile = (req, res) => {

    const { id } = req.params;
    const { email } = req.body;

    const user = bd.getUserById(parseInt(id));

    // comprobación de que el existe el usuario
    if (!user) {
        res.status(404).send();
        return;
    }

    if (email) {
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
    }

    // actualización de los campos pasados en el body
    bd.updateProfile(parseInt(id), req.body);

    res.status(201).send(); // código de actualización correcta
}

// función para eliminar el perfil de un usuario
const removeProfile = (req, res) => {
    const { id } = req.params;

    let user = bd.getUserById(parseInt(id));
    // comprobación de que el existe el usuario
    if (!user) {
        res.status(404).send();
        return;
    }
    // eliminación del perfil 
    bd.deleteProfile(parseInt(id));

    res.status(204).json();
}

module.exports = { // funciones exportadas del controlador
    getProfile,
    editProfile,
    removeProfile
}