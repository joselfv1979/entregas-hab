const bd_book = require('../bd_mock/book_bd.js'); 
const bd_user = require('../bd_mock/user_bd.js');
const bd_space = require('../bd_mock/space_bd.js'); // bds de pruebas
const mail = require('../utils/mail_util'); // importación de la función de envío de mails

// función que devuelva la lista de reservas por espacio según su id
const getBooksBySpace = (req, res) => {

    const { spaceId } = req.params;
    const space = bd_space.getSpaceById(parseInt(spaceId));
    // comprobación de la existencia del espacio
    if (!space) {
        res.status(404).send(); // error de recurso no encontrado
        return
    }

    const books = bd_book.getBooksBySpace(parseInt(spaceId));
    // devolución del array de reservas
    res.json(books)
}
// función que devuelva la lista de reservas de un usuario según su id
const getBooks = (req, res) => {
    // el id de usuario se recupera del token
    const { userId } = req.auth;

    const books = bd_book.getBooks(parseInt(userId));
    // devolución del array de reservas
    res.json(books);
}
// función para crear una nueva reserva
const addBook = (req, res) => {
    // id de usuario de la reserva
    const { userId } = req.auth;
    // id del espacio objeto de la reserva
    const { spaceId } = req.params;

    const { userName, hotel, spaceName, location, address, type, distribution, startTime, endTime, totalHours, equipment } = req.body;
    // campos requeridos en el body para realizar la reserva
    if (!userName || !hotel || !spaceName || !location || !address || !type || !distribution || !startTime || !endTime || !totalHours || !equipment) {
        res.status(400).send();
        return;
    }
    // cálculo del precio de la reserva
    const space = bd_space.getSpaceById(parseInt(spaceId));
    const totalPrice = space.price*totalHours;

    bd_book.saveBook(req.body, totalPrice, parseInt(spaceId), userId);

    const user = bd_user.getUserById(parseInt(userId));
    // recuperación del usuario para envirle el mail de confirmación de reserva
    const email = user.email

    const message = 'Reserva realizada correctamente';
    mail.sendMail(email, message);
    // envío de mail
    res.status(201).send(); // código de registro correcto
}
// función para eliminar una reserva por el id de reserva
const removeBook = (req, res) => {
    const { bookId } = req.params;

    const book = bd_book.getBookById(parseInt(bookId));
    console.log(book);
    // comprobación de que la reserva existe
    if (!book) {
        res.status(404).send();
        return;
    }

    bd_book.deleteBook(parseInt(bookId));

    res.status(204).send(); // código de borrado correcto
}
// exportación de las funciones de las gestión de reservas
module.exports = {
    getBooksBySpace,
    getBooks,
    addBook,
    removeBook
}