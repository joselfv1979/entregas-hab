require('dotenv').config(); // librería para configurar las variables de entorno guardads en el archivo .env

const bodyParser = require('body-parser'); // librería de parseo de datos a json
const cors = require('cors'); // librería para configurar CORS
const express = require('express'); // librería para crear el entorno de servidor express
const morgan = require('morgan');

// importación de módulos
const { login } = require('./controllers/users');
const { isAuthenticated } = require('./middlewares/auth');
const { add, list, change } = require('./controllers/products');

const port = process.env.PORT;

// creación del servidor
const app = express();

// middlewares de creación de logs, parseo y habilitación de CORS
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// endpoint de logueo
app.post('/login', login);

// endpoint de listado de productos, no requiere autenticación previa
app.get('/product', list);

// endpoint de creación de producto nuevo con middleware previo de autenticación
app.post('/product', isAuthenticated, add);
// endpoint de modificación de producto nuevo con middleware previo de autenticación
app.put('/product/:id', isAuthenticated, change);

// middleware que devuelve los errores 
app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .send({status: 'error', message: error.message})
})

app.listen(port, () => { // inicialización del servidor
    console.log(`Server listening on port ${port}`);
});