require('dotenv').config(); // librería para configurar las variables de entorno guardadas en el archivo .env

const bodyParser = require('body-parser'); // librería de parseo de datos a json
const cors = require('cors'); // librería para configurar CORS
const express = require('express'); // librería para crear el entorno de servidor express
const fs = require('fs'); // librería para trabajar con ficheros
const morgan = require('morgan'); // librería para crear el middleware de loggs 
const path = require('path'); // librería para trabajar con rutas de archivos y directorios

const userRouter = require('./routes/users'); // variables que almacenan los módulos de los endpoint enrutados
const profileRouter = require('./routes/profiles');
const spaceRouter = require('./routes/spaces');
const bookRouter = require('./routes/books');

const port = process.env.PORT; // puerto de la aplicación

const app = express(); // creación del servidor

const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a' });
// middleware de registro de logs en un archivo creado en el directorio 'logs' y por consola
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev'));
app.use(bodyParser.json()); // middleware de parseo
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors()); // middleware de habilitación de CORS

app.use('/users', userRouter);  // middlewares de enrutamiento
app.use('/profiles', profileRouter); 
app.use('/spaces', spaceRouter);
app.use('/books', bookRouter);

// middleware que gestiona los errores generados
app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .send({status: 'error', message: error.message})
})

// inicialización del servidor
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});