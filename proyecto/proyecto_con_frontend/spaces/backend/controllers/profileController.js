const validator = require("email-validator"); // librería para validar direcciones de emails
const userBd = require('../services/userService.js'); // bd de pruebas

// función para obtener el perfil de un usuario a través del id de usuario
const getProfile = async (req, res) => {

    const { userId } = req.auth;
    const { id } = req.params;
 
     // comprobación de que el id de usuario coincide con el pasado en el token (o es administrador)
    if (userId != id && userId != 1) {
        res.status(401).json({ error: 'No está autorizado' });
        return;
    }

    const user = await userBd.getUserById(parseInt(id));

    res.status(200).json(user);
}

// función para editar el perfil de un usuario
const editProfile = async (req, res) => {

    const { userId } = req.auth;
    const { id } = req.params;
    const { name, surname, email } = req.body;

    if (userId != id && userId != 1) {
        res.status(401).json({ error: 'No está autorizado' });
        return;
    }

    if (!name || !surname || !email) {
        res.status(400).json({ error: 'Rellene todos los campos' });
        return;
    }

    if (email) {
        // comprobación de dirección de correo válida
        const checkEmail = validator.validate(email);

        if (!checkEmail) {
            res.status(400).json({ error: 'La dirección de email no es válida' });
            return;
        }

        // comprobación de si ya existe otro usuario registrado con ese email
        // const result = await userBd.userExist(email);
        // si existe y no pertenece al mismo usuario, devuelve error
        // if(result){ 
        //     if (result.id != userId) {
        //         res.status(409).json({ description: 'El usuario (email) ya existe' });
        //         return;
        //     }
        // }       
    }

    // actualización de los campos pasados en el body
    if (await userBd.updateProfile(name, surname, email, parseInt(id))) {
        res.status(201).json({ result: 'Perfil actualizado' });
    }
    // código de actualización correcta
}

// función para eliminar el perfil de un usuario
const removeProfile = async (req, res) => {

    const { userId } = req.auth;
    const { id } = req.params;

    if (userId != 1 && userId != id) {
        res.status(401).json({ error: 'No está autorizado' });
        return;
    }

    // eliminación del perfil 
    if (userBd.deleteProfile(parseInt(id))) {
        res.status(200).json({ result: 'Perfil eliminado' });
    }

}

module.exports = { // funciones exportadas del controlador
    getProfile,
    editProfile,
    removeProfile
}