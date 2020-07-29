// IMPORTACIÓN DE LIBRERÍAS EXTERNAS
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()

// HERRAMIENTAS QUE USA LA APP
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// CONFIGURACIÓN DE LA CONEXION A LA BBDD
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'market',
    password: 'market',
    database: 'market'
})

connection.connect( error => {
    if(error) throw error
    console.log('Database UP');
})

const PORT = 3050

// CONEXIÓN DEL SERVICIO
app.listen(PORT, () => console.log('API UP'))

// RECOGER TODOS LOS CLIENTES
app.get('/clients', (req, res) => {

    // SECUENCIA SQL
    const sql = 'SELECT * FROM listaclientes'

    // CONEXIÓN A LA BBDD
    connection.query(sql, (error, results) => {
        if(error) throw error
        if(results.length > 0){
            res.json(results)
        } else {
            console.log('No hay clientes');
        }
    })
})

// AÑADIR CLIENTES
app.post('/clients/register', (req, res) => {

    // SECUENCIA SQL
    const sql = 'INSERT INTO listaclientes SET ?'

    // OBJETO DE DATOS DEL NUEVO CLIENTE
    const nuevoCliente = {
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        password: req.body.password,
        email: req.body.email,
        foto: req.body.foto
    }

    // CONEXIÓN A LA BBDD
    connection.query(sql, nuevoCliente, error => {
        if(error) throw error
        console.log('Cliente creado con éxito');
    })
})

// ACTUALIZANDO CLIENTES EN LA BBDD
app.put('/clients/update/:id', (req, res) => {

    // DATOS QUE RECIBIMOS DE LA VISTA
    const id = req.params.id
    const nombre = req.body.nombre
    const usuario = req.body.usuario
    const password = req.body.password
    const email = req.body.email
    const foto = req.body.foto

    // SECUENCIA SQL
    const sql = `UPDATE listaclientes SET nombre='${nombre}', usuario='${usuario}', password='${password}', email='${email}', foto='${foto}' WHERE id=${id}`

    // CONEXIÓN A LA BBDD
    connection.query(sql, error => {
        if(error) throw error
        console.log('Cliente actualizado con éxito');
    })
})

// BORRANDO CLIENTES DE LA BBDD
app.delete('/clients/delete/:id', (req, res) => {

    // DATOS QUE LLEGAN DE LA VISTA
    const id = req.params.id

    // SECUENCIA SQL
    const sql = `DELETE FROM listaclientes WHERE id=${id}`

    // CONEXIÓN A LA BBDD
    connection.query(sql, error => {
        if (error) throw error
        console.log('Cliente borrado :(');
    })
})

// RECOGER TODOS LOS PRODUCTOS
app.get('/products', (req, res) => {

    // SECUENCIA SQL
    const sql = 'SELECT * FROM listaproductos'

    // CONEXIÓN A LA BBDD
    connection.query(sql, (error, results) => {
        if(error) throw error
        if(results.length > 0){
            res.json(results)
        } else {
            console.log('No hay productos');
        }
    })
})

// AÑADIR PRODUCTOS
app.post('/products/add', (req, res) => {

    // SECUENCIA SQL
    const sql = 'INSERT INTO listaproductos SET ?'

    // OBJETO DE DATOS DEL NUEVO PRODUCTO
    const nuevoProducto = {
        nombre: req.body.nombre,
        stock: req.body.stock,
        disponibilidad: req.body.disponibilidad,
        imagen: req.body.imagen
    }

    // CONEXIÓN A LA BBDD
    connection.query(sql, nuevoProducto, error => {
        if(error) throw error
        console.log('Producto creado con éxito');
    })
})

