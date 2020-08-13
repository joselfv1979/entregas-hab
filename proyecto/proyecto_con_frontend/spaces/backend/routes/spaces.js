const express = require('express');
const router = express.Router(); // creación de la instancia de enrutamiento

// importación de las funciones requeridas en cada endpoint
const { listSpaces, addSpace, getSpace, editSpace, getSpacesByProvider, removeSpace, getScores } = require('../controllers/spaceController');

// middlewares de autenticación:
// isAuthenticated: general para los usuarios registrados. Específicos para determinados endpoints: 'isSpaceProvider' (para usuarios proveedores de espacios)
const { isAuthenticated, isSpaceProvider } = require('./../middlewares/auth');

router.get('/provider', isAuthenticated, isSpaceProvider, getSpacesByProvider); // listado de espacios por proveedor

router.get('/:id/scores', getScores); // obtención del rating de usuarios de un espacio 

router.get('/:id', getSpace); // obtención de la ficha de un espacio determinado

router.put('/:id', isAuthenticated, isSpaceProvider, editSpace); // actualización de espacios

router.delete('/:id', isAuthenticated, isSpaceProvider, removeSpace); // eliminación espacios

router.get('/', listSpaces); // endpoint de listado de espacios abierto a cualquier usuario

router.post('/', isAuthenticated, isSpaceProvider, addSpace); // creación de espacios 

module.exports = router; // exportación del enrutador