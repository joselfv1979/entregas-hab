// importación de los archivos para guardar los datos de pruebas de backend
const spaceBd = require('../services/spaceService.js');

// función para obtener la lista de espacios, filtrados según los parámetros pasados en la 'req.query'
const listSpaces = async (req, res) => {

    const result = await spaceBd.getFilteredSpaces(req.query);

    if(result.code === 500){
        res.status(500).json({description: 'No se ha podido realizar la búsqueda' });
        return;
    }

    res.status(200).json(result);
}

// función para crear un espacio 
const addSpace = async (req, res) => {

    const { userId } = req.body; 

    const { hotel, city, address, name, description, price, open, close, meetingType, hallType, uLayout, classLayout, theaterLayout, furniture, wifi, projector, screen } = req.body.space;
    
    // comprobación del paso de parámetros en el body de la petición || !meetingType || !hallType || !uLayout || !classLayout || !theaterLayout || !furniture || !wifi || !projector || !screen
    if (!hotel || !city || !address || !name || !description || !price || !open || !close) {
        res.status(400).json({error: 'Cubra todos los campos'});
        return;
    }

    // comprobación de que no existe otro espacio igual
    // const check = await spaceBd.checkSpace(name, hotel, address);

    // if (check > 0) {
    //     res.status(409).json({description: 'El espacio ya existe' });
    //     return;
    // }
    console.log(req.body.space);

    // llamada a la función para añadir el espacio a la BBDD
    if (await spaceBd.saveSpace(userId, req.body.space)) {
        // retorno de registro correcto
        res.status(201).json({description: 'Espacio creado' });
    } else {
        // res.status(500).json({description: 'No se ha podido crear el espacio' });
        console.log('noooooo');
    }
}

// función que devuelve la lista de espacios filtrados por el id del proveedor
const getSpacesByProvider = async (req, res) => {
    const { userId } = req.auth;
    console.log(userId);

    const result = await spaceBd.getSpacesByUserId(parseInt(userId));

    if(result.code === 500){
        res.status(500).json({error: 'No se han podido recuperar los espacios'});
        return;
    }

    res.status(200).json(result);
}

// función que devuelve un espacio determinado según su id
const getSpace = async (req, res) => {

    const { id } = req.params;
    const result = await spaceBd.getSpaceById(parseInt(id));

    if(result.code === 500){
        res.status(500).json({error: 'No se han podido recuperar los espacios'});
        return;
    }

    // devolución de recurso no encontrado, sino existe el espacio
    if (result.length === 0) {
        res.status(404).json({error: 'El espacio no existe'});
        return
    }

    res.status(200).json(result);
}

// función para actualizar un espacio existente
const editSpace = async (req, res) => {
    const { userId } = req.auth;
    const { id } = req.params;

    const { hotel, city, address, name, description, price, meetingType, hallType, uLayout, classLayout, theaterLayout, furniture, wifi, projector, screen, openTime, closeTime } = req.body;

    // comprobación del paso de parámetros en el body de la petición
    if (!hotel || !city || !address || !name || !description || !price || !meetingType || !hallType || !uLayout || !classLayout || !theaterLayout || !furniture || !wifi || !projector || !screen || !openTime || !closeTime) {
        res.status(400).json({error: 'Cubra todos los campos'});
        return;
    }
    // actualizacion del espacio con los campos pasados en el body
    const result = await spaceBd.updateSpace(req.body, parseInt(id), parseInt(userId));

    if(result.code === 500){
        res.status(500).json({error: 'No se ha podido actualizar el espacio'});
        return;
    }
    if(result){
        res.status(201).json({result: 'Espacio actualizado'});
    }else{
        res.status(404).json({error: 'El espacio no existe'});
    }
   
}
// función para eliminar un espacio pasando como parámetro su id
const removeSpace = async (req, res) => {
    const { userId } = req.auth;
    const { id } = req.params;
    // si existe lo eliminamos y devolvemos el código de operación de borrado correcta

    const result = await spaceBd.deleteSpace(parseInt(id), parseInt(userId));
    if(result.code === 500){
        res.status(500).json({error: 'No se ha podido eliminar el espacio'});
        return;
    }
    if(result){
        res.status(200).json({success: 'Espacio eliminado'});
    }else{
        res.status(404).json({error: 'El espacio no existe'});
    }
}

// función que recupera de la base de datos las valoraciones de un espacio según el id pasado en la url
const getScores = async (req, res) => {
    const { id } = req.params;

    // Comprobación de que existe el espacio
    const checkSpace = await spaceBd.checkSpaceById(id);

    if(checkSpace === false){
        res.status(404).json({error: 'El espacio no existe'});
        return;
    }

    // llamada a la función que obtien las valoraciones de la BBDD
    const result = await spaceBd.getScores(parseInt(id));
    console.log(result);

    if(result.code === 500){
        res.status(500).json({error: 'No se han podido obtener las valoraciones'});
        return;
    }

    res.status(200).json(result);    
}

module.exports = {
    listSpaces,
    addSpace,
    getSpace,
    getSpacesByProvider,
    editSpace,
    removeSpace,
    getScores
}
