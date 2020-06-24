const express = require('express');
const router = express.Router();

const { getBooksBySpace, getBooks, addBook, removeBook } = require('../controllers/bookController');

// middlewares de autenticación:
// isAuthenticated: general para los usuarios registrados. Específicos para determinados endpoints: 'isSpaceProvider' (para usuarios proveedores de espacios), isSpaceSeeker (para usuarios buscadores de espacios)
const { isAuthenticated, isSpaceSeeker, isSpaceProvider } = require('./../middlewares/auth');

// endpoint para listar las reservas de un espacio determinado (para proveedores)
router.get('/:spaceId', isAuthenticated, isSpaceProvider, getBooksBySpace);

// endpoint para realizar una reserva
router.post('/:spaceId', isAuthenticated, isSpaceSeeker, addBook);

// endpoint para eliminar una reserva
router.delete('/:bookId', isAuthenticated, isSpaceSeeker, removeBook);

// endpoint para listar las reservas de un usuario buscador de espacios
router.get('/', isAuthenticated, isSpaceSeeker, getBooks);

module.exports = router; // exportación del enrutador