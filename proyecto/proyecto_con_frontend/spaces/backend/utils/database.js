const mysql = require('mysql2/promise');

// configuración de la conexión a la base de datos
async function connection(){
    return mysql.createConnection({
        host : 'localhost',
        database : 'spaces',
        user : 'spaces',
        password : 'spaces',
        });
}

module.exports = {
    connection
};   // exportación de la conexión
