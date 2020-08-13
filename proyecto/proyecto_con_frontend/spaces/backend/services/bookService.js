const database = require('../utils/database');

// función que comprueba la existencia de una reserva por su id
const checkBook = async (id) => {
    const sql = 'select * FROM books where id = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id])
        if (rows.length === 0) {
            return false // devuelve false si la consulta no obtiene resultados
        }
    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        }
    }
}

const getBookById = async (userId, spaceId, bookId) => {

    const sql = 'SELECT CONCAT(U.name, " ", U.surname) AS "client", U.email, CONCAT(S.hotel, " ", S.name) AS "place", CONCAT(S.address, " ", S.city) AS "address", B.type, B.layout, B.furniture, B.wifi, B.projector, B.screen, B.attendees, B.book_date, B.price, B.start_time, B.end_time FROM users U, spaces S, books B WHERE B.id = ? AND S.id = ? AND U.id = ? AND B.user_id = U.id AND B.space_id = S.id'
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [bookId, spaceId, userId])
        console.log(rows[0]);
        return rows[0]
    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        }
    }  
}

// función para añadir una reserva nueva, devuelve true si la consulta de inserción tiene éxito. 
// Parámetros => data: opciones de la reserva, price: precio calculado, spaceId: espacio objeto de la reserva, userId: usuario que reserva

const saveBook = async (book, price, spaceId, userId) => {

    const { type, layout, furniture, wifi, projector, screen, attendees, startTime, endTime } = book;

    const sql = 'insert into books (type, layout, furniture, wifi, projector, screen, attendees, start_time, end_time, price, user_id, space_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [type, layout, furniture, wifi, projector, screen, attendees, startTime, endTime, price, userId, spaceId]);
        return rows;
    } catch (error) {
        console.log(error);
    }

}
// recuperación de las reservas de un espacio determinado
const getSpaceBooks = async (spaceId, userId) => {

    // consulta sobre las tablas de usuarios, espacios y reservas relacinándolas por sus claves ajenas (ids respectivos) 
    const sql = 'select U.name, U.surname, B.type, B.layout, B.furniture, B.wifi, B.projector, B.screen, B.attendees, B.book_date, B.start_time, B.end_time, B.price from users U, spaces S, books B where S.user_id = ? and S.id = ? and S.id = B.space_id and U.id = B.user_id';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [userId, spaceId]);
        return rows;
    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        }
    }
}

// comprobación de disponibilidad de espacio para unos horarios de reserva determinados
const checkBookTime = async (spaceId, startTime, endTime) => {

    const sql = ' select * from books where space_id = ? and (start_time between ? AND ? or end_time between ? AND ? or start_time < ? AND end_time > ?);';
    const connection = await database.connection();
    const [rows] = await connection.execute(sql, [spaceId, startTime, endTime, startTime, endTime, startTime, endTime]);

    if (rows.length > 0) {
        return true; // si ya existen reservas en la franja horaria solicitada devuelve true
    }
}

// recuperación de las reservas de un usuario determinado
const getBooks = async (userId) => {

    // consulta sobre las tablas de usuarios, espacios y reservas relacinándolas por sus claves ajenas (ids respectivos) 
    const sql = 'select U.name, U.surname, S.hotel, S.city, S.address, B.id, B.type, B.layout, B.furniture, B.wifi, B.projector, B.screen, B.attendees, B.book_date, B.start_time, B.end_time, B.price from users U, spaces S, books B where B.user_id = ? and S.id = B.space_id and U.id = B.user_id';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [userId]);
        return rows;
    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        }
    }
}

// borrado de una reserva
const deleteBook = async (userId, id) => {
    const sql = 'DELETE FROM books WHERE id = ? and user_id = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id, userId]);

        if (rows.affectedRows === 1) {
            return true // Devuelve true si alguna fila de la tabla se borró
        }

    } catch (error) {
        console.log(error);
    }
}

// Añadido de valoración sobre una reserva consumida, se actualizan los campos rating y view de la tabla reservas, que antes de realizar la valoración no tenían valor (null)
const createScore = async (rating, review, userId, id) => {

    const sql = 'UPDATE books SET rating = ?, review = ? WHERE id = ? and user_id = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [rating, review, id, userId]);

        if (rows.affectedRows === 1) {
            return true // Devuelve true si alguna fila de la tabla se actualizó
        }

    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    checkBook,
    saveBook,
    getBookById,
    getSpaceBooks,
    checkBookTime,
    getBooks,
    deleteBook,
    createScore
}