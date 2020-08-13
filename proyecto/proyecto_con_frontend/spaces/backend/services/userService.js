const database = require("../utils/database");

//  Función para comprobar si un usuario existe ya en la base de datos
//  @param email

const userExist = async (email) => {

    const sql = 'SELECT id FROM users WHERE email = ?';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [email]);
        return rows.length;
        
    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        }
    }
}

// Función de registro de usuario nuevo
const saveUser = async (user) => {

    const { name, surname, email, password, role } = user;

    const sql = 'insert into users (name, surname, email, password, role) values (?, ?, ?, SHA1(?), ?)';

    try {
        const connection = await database.connection();
        await connection.execute(sql, [name, surname, email, password, role]);
        return true;

    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        }
    }

}

// recuperación de usuario por email
const loginUser = async (email, password) => {

    const sql = 'SELECT id, name, role FROM users WHERE email = ? AND password = SHA1(?)';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [email, password]);

        return rows[0];
    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }
}

// recuperación de usuario por id
const getUserById = async (id) => {

    const sql = 'SELECT email, name, surname FROM users WHERE id = ?';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        return rows[0];

    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        };
    }

}

// actualización de usuario según los campos pasados en el data 
const updateProfile = async (name, surname, email, id) => {

    const sql = 'UPDATE users SET name = ?, surname = ?, email = ? WHERE id = ?'

    try {
        const connection = await database.connection();
        await connection.execute(sql, [name, surname, email, id]);
        return true;

    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }
}
// eliminación de perfil de usuario
const deleteProfile = async (id) => {

    const sql = 'DELETE FROM users WHERE id = ?'

    try {
        const connection = await database.connection();
        await connection.execute(sql, [id]);
        return true;

    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }
}

module.exports = {
    userExist,
    saveUser,
    loginUser,
    getUserById,
    updateProfile,
    deleteProfile
}