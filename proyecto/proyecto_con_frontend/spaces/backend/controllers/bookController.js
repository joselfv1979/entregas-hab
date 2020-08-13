const bookBd = require('../services/bookService.js');
const spaceBd = require('../services/spaceService.js');
const userBd = require('../services/userService.js');
const mail = require('../utils/mail_util'); // importación de la función de envío de mails
const time = require('../utils/time_util'); // importación de la función para extraer la hora de una fecha


const getBook = async (req, res) => {
    const { userId } = req.auth
    const { spaceId } = req.query
    const { id } = req.params

    const result = await bookBd.getBookById(parseInt(userId), parseInt(spaceId), parseInt(id))

    res.status(200).json(result)
}
// función que devuelva la lista de reservas por espacio según su id
const getBooksBySpace = async (req, res) => {

    const { userId } = req.auth;
    const { spaceId } = req.query;
    // Comprobación de que se recibe el id del espacio en la petición
    if(!spaceId){
        res.status(400).json({error: 'Indique el espacio'});
        return;
    }
    // Comprobación de que existe el espacio
    const checkSpace = await spaceBd.checkSpaceById(spaceId);

    if(checkSpace === false){
        res.status(404).json({error: 'El espacio no existe'});
        return;
    }

    const result = await bookBd.getSpaceBooks(parseInt(spaceId), parseInt(userId));

    if(result.code === 500){
        res.status(500).json({error: 'No se han podido recuperar las reservas'});
        return;
    }
    // devolución del array de reservas
    res.status(200).json(result)
}
// función que devuelva la lista de reservas de un usuario según su id
const getBooks = async (req, res) => {
    // el id de usuario se recupera del token
    const { userId } = req.auth;

    const result = await bookBd.getBooks(parseInt(userId));

    if(result.code === 500){
        res.status(500).json({error: 'No se han podido recuperar las reservas'});
        return;
    }
    // devolución del array de reservas
    res.status(200).json(result);
}

// función para crear una nueva reserva
const addBook = async (req, res) => {
    // id de usuario de la reserva
    const { userId } = req.auth;
    const { spaceId, type, layout, furniture, wifi, projector, screen, attendees, startTime, endTime } = req.body;
    console.log(req.body);
    // startTime y endTime se reciben en formato 'YYYY-MM-DD HH:mm:ss'
    // campos requeridos en el body para realizar la reserva
    if (!spaceId || !userId || !type || !layout || !attendees || !startTime || !endTime) {
        res.status(400).json({error: 'Cubra todos los campos'});
        return;
    }
    // comprobación de que existe el espacio solicitado
    const checkSpace = await spaceBd.checkSpaceById(parseInt(spaceId))

    if(checkSpace === false){
        res.status(404).json({error: 'El espacio no existe'});
        return;
    }

    // Extracción de las horas de reserva a través de la función time de time_utils
    const [startHour, endHour] = time.getHours(startTime, endTime);
    
    // comprobación de que las horas de reserva se ajustan al horario del espacio 
    const checkTimetable = await spaceBd.checkSpaceHours(spaceId, startHour, endHour);

    // comprobación de que las horas de reserva no coinciden con las de otras reservas para un espacio determinado
    //* Asumo una hora de margen entre una reserva y la siguiente para reacondicionar el espacio *
    const checkBooks = await bookBd.checkBookTime(spaceId, startTime, endTime);
    // checkTimetable === 0 => el horario del espacio no es compatible 
    // checkBooks === true => ya existen reservas que coinciden con el horario solicitado
    if(checkTimetable === 0 || checkBooks === true) {
        res.status(409).send('El horario no está disponible');
        return;
    }

    // obtención del precio de la reserva del espacio por hora y cálculo del precio total de la reserva
    const hourPrice = await spaceBd.getPrice(parseInt(spaceId));
    const totalPrice = (endHour - startHour) * hourPrice;

    // llamada a la función que crea la reserva en la BBDD 
    const result = await bookBd.saveBook(req.body, totalPrice, parseInt(spaceId), userId)

    // recuperación del usuario para envirle el mail de confirmación de reserva
    const user = await userBd.getUserById(parseInt(userId));

    const email = user.email;

    const message = 'Reserva realizada correctamente';

    // envío de mail
    mail.sendMail(email, message);

    bookId = result.insertId

    res.status(201).json(bookId)

}
    
    
// función para eliminar una reserva por el id de reserva
const removeBook = async (req, res) => {

    const { userId } = req.auth;
    const { id } = req.params;

    const checkBook = await bookBd.checkBook(parseInt(id))
    // comprobación de la existencia de la reserva
    if(checkBook === false){
        res.status(404).json({error: 'La reserva no existe'});
        return;
    }
    // llamada a la función que elimina la reserva en la BBDD
    if(await bookBd.deleteBook(parseInt(userId), parseInt(id))){
        res.status(200).json({success: 'Reserva cancelada'});
    } else {
        res.status(500).json({description: 'No se ha podido cancelar la reserva' });
    } 
}

// función para añadir una valoración a una reserva (se valora la reserva, es decir el servicio prestado)
const addScore = async (req, res) => {

    const { userId } = req.auth;
    const { id } = req.params;
    const { rating, review } = req.body;
    // Comprobación del paso de parámetros requeridos
    if(!rating || !review) {
        res.status(400).json({error: 'Cubra todos los campos'});
        return;
    }
    // comprobación de la existencia de la reserva
    const checkBook = await bookBd.checkBook(parseInt(id))

    if(checkBook === false){
        res.status(404).json({error: 'La reserva no existe'});
        return;
    }
    // llamada a la función que añade la valoración a la reserva en la BBDD
    if(await bookBd.createScore(parseInt(rating), review, parseInt(userId), parseInt(id))){
        res.status(201).json({success: 'Valoración añadida'});
    } else {
        res.status(500).json({description: 'No se ha podido realizar la valoración' });
    }  
}
// exportación de las funciones de las gestión de reservas
module.exports = {
    getBooksBySpace,
    getBook,
    getBooks,
    addBook,
    removeBook,
    addScore
}