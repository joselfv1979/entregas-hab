const database = require('../utils/database');

// Función que comprueba la existencia de un espacio por su id
const checkSpaceById = async (id) => {

    const sql = 'select * FROM spaces where id = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id])
        if (rows.length === 0) {
            return false
        }
    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        }
    }
}

// comprobación de la existencia de un espacio según los campos pasados como parámetros
const checkSpace = async (name, hotel, address) => {

    const sql = 'select id FROM spaces where name = ? and hotel = ? and address = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [name, hotel, address]);
        return rows.length;
    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        }
    }
}

// función que obtiene el precio/hora de un espacio por su id
const getPrice = async (id) => {
    const sql = 'select price FROM spaces where id = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        return rows[0].price;
        ;
    } catch (error) {
        return error;
    }
}
// función que comprueba los horarios de un espacio en relación con las horas solicitadas en la reserva del cliente
const checkSpaceHours = async (spaceId, startTime, endTime) => {

    const sql = 'select * FROM spaces where open_hour <= ? and close_hour >= ? and id = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [startTime, endTime, spaceId]);
        return rows.length; // Devuelve 1 si los horarios coinciden, 0 sino
    } catch (error) {
        console.log(error);
    }
}

// obtención de array de espacios filtrando por id de usuario
const getSpacesByUserId = async (id) => {
    const sql = 'select * FROM spaces where user_id = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        }
    }
}

// búsqueda de espacio por su id
const getSpaceById = async (id) => {
    const sql = 'select * FROM spaces where id = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        }
    }
}

// filtrado de espacios según los campos pasados en el data, los criterios de búsqueda pasados en el body se añaden al array parámetros y este se le pasa a la consulta. La variable count se utiliza para construir la consulta, dependiendo de si la cantidad de parámetros que se añaden es 0 ó > 0.
const getFilteredSpaces = async (data) => {

    const { city, hotel, price, type, layout, furniture, wifi, projector, screen, startTime, endTime } = data;

    let parametros = [];

    let sql = 'select * FROM spaces';
    let count = 0;

    if (city) {
        sql += ' WHERE city = ?';
        parametros.push(city)
        count++;
    }

    if (hotel) {
        if (count === 0)
            sql += ' WHERE hotel = ?';
        else
            sql += ' AND hotel = ?';
        parametros.push(hotel)
        count++;
    }

    if (price) {
        console.log(price);
        if (count === 0)
            sql += ' WHERE price <= ?';
        else
            sql += ' AND price <= ?';
        parametros.push(parseInt(price))
        count++;
    }

    if (type) {
        if (count === 0) {
            for (item of type) {
                if (parseInt(item) === 1) {
                    sql += ' WHERE hall_type = 1';
                }
                if (parseInt(item) === 2) {
                    sql += ' WHERE meeting_type = 1';
                }
            }
        }

        else {
            for (item of type) {
                if (parseInt(item) === 1) {
                    sql += ' AND hall_type = 1';
                }
                if (parseInt(item) === 2) {
                    sql += ' AND meeting_type = 1';
                }
            }
        }
        count++;
    }

    if (layout) {
        if (count === 0) {
            for (item of layout) {
                if (parseInt(item) === 1) {
                    sql += ' WHERE u_layout = 1';
                }
                if (parseInt(item) === 2) {
                    sql += ' WHERE class_layout = 1';
                }
                if (parseInt(item) === 3) {
                    sql += ' WHERE theater_layout = 1';
                }
            }
        }
        else {
            for (item of layout) {
                if (parseInt(item) === 1) {
                    sql += ' AND u_layout = 1';
                }
                if (parseInt(item) === 2) {
                    sql += ' AND class_layout = 1';
                }
                if (parseInt(item) === 3) {
                    sql += ' AND theater_layout = 1';
                }
            }
        }
        count++;
    }

    if (furniture) {
        if (count === 0)
            sql += ' WHERE furniture = 1';
        else
            sql += ' AND furniture = 1';
        count++;
    }

    if (wifi) {
        if (count === 0)
            sql += ' WHERE wifi = 1';
        else
            sql += ' AND wifi = 1';
        count++;
    }

    if (projector) {
        if (count === 0)
            sql += ' WHERE projector = 1';
        else
            sql += ' AND projector = 1';
        count++;
    }

    if (screen) {
        if (count === 0)
            sql += ' WHERE screen = 1';
        else
            sql += ' AND screen = 1';
        count++;
    }

    if (startTime) {
        if (count === 0)
            sql += ' WHERE open_hour <= ?';
        else
            sql += ' AND open_hour <= ?';
        parametros.push(startTime)
        count++;
    };

    if (endTime) {
        if (count === 0)
            sql += ' WHERE close_hour >= ?';
        else
            sql += ' AND close_hour >= ?';
        parametros.push(endTime)
        count++;
    }

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, parametros);
        return rows;
    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        }
    }
}

// función para añadir un espacio nuevo al array
const saveSpace = async (userId, space) => {

    const { name, hotel, city, address, description, price, furniture, wifi, projector, screen, meetingType, hallType, uLayout, classLayout, theaterLayout, image1, image2, open, close } = space;

    console.log(space);

    const sql = 'insert into spaces (name, hotel, city, address, description, price, meeting_type, hall_type, u_layout, class_layout, theater_layout, furniture, wifi, projector, screen, image_1, image_2, open_hour, close_hour, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const connection = await database.connection();
        await connection.execute(sql, [name, hotel, city, address, description, price, meetingType, hallType, uLayout, classLayout, theaterLayout, furniture, wifi, projector, screen, image1, image2, open, close, userId]);

        return true;
    } catch (error) {
        console.log(error);
    }
}
// función para actualizar un espacio según los campos pasados en el data
const updateSpace = async (data, spaceId, userId) => {
    const { name, hotel, city, address, description, price, furniture, wifi, projector, screen, meetingType, hallType, uLayout, classLayout, theaterLayout, openTime, closeTime } = data;
    const sql = 'UPDATE spaces SET name = ?, hotel = ?, city = ?, address = ?, description = ?, price = ?, furniture = ?, wifi = ?, projector = ?, screen = ?, meeting_type = ?, hall_type = ?, u_layout = ?, class_layout = ?, theater_layout = ?, open_hour = ?, close_hour = ? WHERE id = ? and user_id = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [name, hotel, city, address, description, price, furniture, wifi, projector, screen, meetingType, hallType, uLayout, classLayout, theaterLayout, openTime, closeTime, spaceId, userId]);

        if (rows.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }
}
// borrado de un espacio por su id
const deleteSpace = async (spaceId, userId) => {
    const sql = 'DELETE FROM spaces WHERE id = ? and user_id = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [spaceId, userId]);

        if (rows.affectedRows === 1) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        };
    }
}

const getScores = async (spaceId) => {

    // calcular y mostrar valoración media
    const sql = 'SELECT CONCAT(U.name, " ", U.surname) AS "user", rating, review, book_date FROM users U, books B WHERE U.id = B.user_id and B.space_id = ? and rating IS NOT NULL';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [spaceId]);
        return rows;

    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        };
    }
}

module.exports = {
    checkSpaceById,
    checkSpace,
    checkSpaceHours,
    getPrice,
    getSpacesByUserId,
    getSpaceById,
    getFilteredSpaces,
    saveSpace,
    updateSpace,
    deleteSpace,
    getScores
}