const express = require('express');
const router = express.Router();

const { getBooksBySpace, getBooks, getBook, addBook, removeBook, addScore } = require('../controllers/bookController');

// middlewares de autenticación:
// isAuthenticated: general para los usuarios registrados. Específicos para determinados endpoints: 'isSpaceProvider' (para usuarios proveedores de espacios), isSpaceSeeker (para usuarios buscadores de espacios)
const { isAuthenticated, isSpaceSeeker, isSpaceProvider } = require('./../middlewares/auth');

// endpoint para realizar una reserva
router.post('/', isAuthenticated, isSpaceSeeker, addBook);

// endpoint para realizar una valoración sobre una reserva
router.post('/:id', isAuthenticated, addScore);

// endpoint para eliminar una reserva
router.delete('/:id', isAuthenticated, isSpaceSeeker, removeBook);

// endpoint para listar las reservas de un espacio determinado (para proveedores)
router.get('/providers', isAuthenticated, isSpaceProvider, getBooksBySpace);

// endpoint para listar las reservas de un usuario buscador de espacios
router.get('/seekers', isAuthenticated, isSpaceSeeker, getBooks);

router.get('/seekers/:id', isAuthenticated, isSpaceSeeker, getBook)

module.exports = router; // exportación del enrutador