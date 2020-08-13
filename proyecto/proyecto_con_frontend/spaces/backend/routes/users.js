const express = require('express');
const router = express.Router(); // creación de la instancia de enrutamiento

const { login, register } = require('../controllers/userController'); // importación de las funciones de registro y logueo del controlador de usuarios

router.post('/register', register); // endpoint de registro

router.post('/login', login); // endpoint de logueo

module.exports = router; // exportación del enrutador