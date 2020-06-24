// importación de los archivos para guardar los datos de pruebas de backend
const spaceBd = require('../bd_mock/space_bd.js');
const scoreBd = require('../bd_mock/score_bd.js');

// función para obtener la lista de espacios, filtrados según los parámetros pasados en la 'req.query'
const listSpaces = (req, res) => {

    const spaces = spaceBd.getFilteredSpaces(req.query);

    res.json(spaces);
}

// función para crear un espacio 
const addSpace = (req, res) => {
    const { userId } = req.auth; // recojemos el id de usuario del token
    
    const { hotel, spaceName, location, address, type, distribution, openTime, closeTime, equipment, price, description, images } = req.body;

    // comprobación del paso de parámetros en el body de la petición
    if (!hotel || !spaceName || !location || !address || !type || !openTime || !closeTime || !equipment || !price) {
        res.status(400).send();
        return;
    }
    
    // comprobación de que no exista otro espacio igual
    const space = spaceBd.checkSpace(hotel, spaceName, address);
    
    if (space.length !== 0) {
        res.status(409).send();
        return;
    }
    // registro del espacio
    spaceBd.saveSpace(userId, req.body);
    // retorno de registro correcto
    res.status(201).send();
}
// función que devuelve la lista de espacios filtrados por el id del proveedor
const getSpacesByProvider = (req, res) => {
    const { userId } = req.auth;
    
    const spaces = spaceBd.getSpacesByUserId(parseInt(userId));

    res.json(spaces);
}
// función que devuelve un espacio determinado según su id
const getSpace = (req, res) => {
    const { id } = req.params;
    const space = spaceBd.getSpaceById(parseInt(id));
    
    // devolución de recurso no encontrado, sino existe el espacio
    if (!space) {
        res.status(404).send();
        return
    }

    res.json(space);
}
// función para actualizar un espacio existente
const editSpace = (req, res) => {
    const { id } = req.params;
    // recuperación del espacio
    const space = spaceBd.getSpaceById(parseInt(id));
    // devolución de recurso no encontrado, sino existe el espacio
    if (!space) {
        res.status(404).send();
        return;
    }
    // actualizacion del espacio con los campos pasados en el body
    spaceBd.updateSpace(parseInt(id), req.body);

    res.status(201).send();
}
// función para eliminar un espacio pasando como parámetro su id
const removeSpace = (req, res) => {
    const { id } = req.params;
    // comprobamos la existencia del espacio en la base de datos
    const space = spaceBd.getSpaceById(parseInt(id));
    // si no existe devolvemos error
    if (!space) {
        res.status(404).send();
        return;
    }
    // si existe lo eliminamos y devolvemos el código de operación de borrado correcta
    spaceBd.deleteSpace(parseInt(id))
    res.status(204).send();
}

// función para añadir una valoración sobre un espacio
const addScore = (req, res) => {
    const { id } = req.params;
    // comprobamos su existencia por su id
    const space = spaceBd.getSpaceById(parseInt(id));

    if (!space) {
        res.status(404).send();
        return;
    }
    // añadimos la valoración a la base de datos  
    scoreBd.addScore(parseInt(id), req.body);
    // si existe lo eliminamos y devolvemos el código de operación de registro correcta
    res.status(201).send();
}
// función que recupera de la base de datos las valoraciones de un espacio según el id pasado en la url
const getScores = (req, res) => {
    const { id } = req.params;

    const space = spaceBd.getSpaceById(parseInt(id));
    
    if (!space) {
        res.status(404).send();
        return;
    }

    const scores = scoreBd.getScores(parseInt(id));

    res.json(scores);
}

module.exports = {
    listSpaces,
    addSpace,
    getSpace,
    getSpacesByProvider,
    editSpace,
    removeSpace,
    addScore,
    getScores
}
