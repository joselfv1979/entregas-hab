const express = require('express');
const router = express.Router(); // creación de la instancia de enrutamiento

const { isAuthenticated } = require('./../middlewares/auth'); // importación del  middleware de autenticación

// importación de las funciones que gestionan los perfiles
const { getProfile, editProfile, removeProfile } = require('../controllers/profileController');

// para el acceso a estos endpoints se controla la autenticación previa 
router.get('/:id', isAuthenticated, getProfile); // endpoint para la obtención del perfil

router.put('/:id', isAuthenticated, editProfile); // actualización del perfil

router.delete('/:id', isAuthenticated, removeProfile); // eliminación del perfil

module.exports = router; // exportación del enrutador