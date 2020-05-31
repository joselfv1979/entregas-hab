/**
 * Un cliente nos pide realizar un sistema para gestionar eventos culturales.
 * Necesita dar de alta eventos, que pueden ser de tipo 'concierto', 'teatro' o 
 * 'monólogo'. Cada uno se caracteriza por un 'nombre', 'aforo' y 'artista'.
 * Opcionalmente pueden incluir una descripción.
 * 
 * El cliente necesitará una API REST para añadir eventos y poder obtener
 * una lista de los existentes.
 * 
 * El objetivo del ejercicio es que traduzcas estos requisitos a una descripción
 * técnica, esto es, decidir qué endpoints hacen falta, qué parámetros y cuáles 
 * son los código de error a devolver
 * 
 * Notas:
 *    - el conocimiento necesario para realizarlo es el adquirido hasta la clase del
 *      miércoles
 *    - llega con un endpoint GET y otro POST
 *    - el almacenamiento será en memoria, por tanto cuando se cierre el servidor
 *      se perderán los datos. De momento es aceptable esto.
 * 
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Array que almacena los eventos
let events = [];

// Endpoint para crear eventos
app.post('/events', (req, res) => {
    // variable booleana para comprobar si el evento ya existe
    let exists = false;
    // bucle que comprueba si el nombre del evento ya existe 
    events.forEach(event => {
        if (event.name === req.body.name){
            exists = true;        
        }
    })
    // comprobación de los campos requeridos del evento
    if (req.body.type === undefined || req.body.name === undefined || req.body.limit === undefined || req.body.artist === undefined ){
        res.status(400).send(); // en caso de que falte algún campo
        console.log('Falta alguno de los campos');  
        return;  
    } 
    else if(req.body.type !== 'concierto' && req.body.type !== 'teatro' && req.body.type !== 'monólogo'){
        res.status(400).send();
        console.log('El tipo de evento no es correcto');     
    }
    else if( exists === true) {
        res.status(409).send(); // en caso de que el evento ya exista
        console.log('Ya existe');        
    } 
    else { // si la petición es correcta se crea el evento y se añade al array
        let data = {
            type: req.body.type,
            name: req.body.name,
            limit: req.body.limit,
            artist: req.body.artist,
            description: req.body.description
        }
        events.push(data);
    }
    
    res.send();
});

// Endpoint para obtener la lista de eventos creados
app.get('/events', (req, res) => {
    
    res.json(events);
});

app.listen(8000);