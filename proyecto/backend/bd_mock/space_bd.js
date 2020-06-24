const time = require('./../utils/time_util');

let spaceId = 1;
// array de espacios
let spaces = [
    {
        spaceId: 0,
        userId: 1,
        hotel: 'Hotel AA',
        spaceName: 'Sala 1',
        location: 'Vigo',
        address: 'Gran Vía 10',
        type: 'conference',
        distribution: 'theater',
        openTime: 9,
        closeTime: 22,
        price: 20,
        equipment: ['proyector', 'phone'],
        description: 'Nice place',
        images: ['salon_1.png', 'salon.png']
    }
];
// comprobación de la existencia de un espacio según los campos pasados como parámetros
const checkSpace = (hotel, spaceName, address) => {

    return spaces.filter(space => space.hotel === hotel)
        .filter(space => space.spaceName === spaceName)
        .filter(space => space.address === address)
}
// obtención de array de espacios filtrando por id de usuario
const getSpacesByUserId = (id) => {
    return spaces.filter(space => space.userId === id);
}
// búsqueda de espacio por id de espacio
const getSpaceById = (id) => {
    return spaces.find(space => space.spaceId === id);
}

// filtrado de espacios según los campos pasados en el data
const getFilteredSpaces = (data) => {
    // array resultante
    let result = [...spaces];

    const { location, type, distribution, startTime, endTime, equipment, price } = data;
    // obtención de la hora de las fechas elegidas
    const start = time.getHour(startTime);
    const end = time.getHour(endTime);
    // filtro por localidad
    const filterByLocation = space => space.location.toLowerCase() === location.toLowerCase();
    // filtro por tipo de espacio
    const filterByType = space => space.type.toLowerCase() === type.toLowerCase();
    // filtro por  por precio
    const filterByPrice = space => space.price === price;
    // filtro por horas de entrada y salida
    const filterByStartTime = space => parseInt(space.openTime) <= start;
    const filterByEndTime = space => parseInt(space.closeTime) >= end;
    // // filtro por distribución del espacio
    const filterByDistribution = space => space.distribution.toLowerCase() === distribution.toLowerCase();

    if (location) {
        result = result.filter(filterByLocation)
    }
    if (type) {
        result = result.filter(filterByType)
    }
    if (price) {
        result = result.filter(filterByPrice)
    }
    // filtro por equipamiento del espacio
    if (equipment) {

        if (typeof (equipment) === 'string') {
            result = result.filter(space => space.equipment.indexOf(equipment) !== -1);
            console.log('true');

        } else {
            for (item of equipment) {
                result = result.filter(space => space.equipment.indexOf(item) !== -1);
            }
        }
    }

    if (start) {
        result = result.filter(filterByStartTime)
    }

    if (end) {
        result = result.filter(filterByEndTime)
    }

    if (distribution) {
        result = result.filter(filterByDistribution)
    }

    return result;
}

// función para añadir un espacio nuevo al array
const saveSpace = (userId, data) => {

    const { hotel, spaceName, location, address, type, distribution, openTime, closeTime, price, equipment, description, images } = data;

    spaces.push(
        {
            spaceId: spaceId++,
            userId,
            hotel,
            spaceName,
            location,
            address,
            type,
            distribution,
            openTime,
            closeTime,
            price,
            equipment,
            description,
            images
        }
    );

}
// función para actualizar un espacio según los campos pasados en el data
const updateSpace = (id, data) => {
    let space = getSpaceById(id);
    Object.keys(data).forEach(field => {
        space[field] = data[field]
    });
}
// borrado de un espacio por su id
const deleteSpace = (id) => {
    spaces = spaces.filter(space => space.spaceId !== id);
}

module.exports = {
    checkSpace,
    getSpacesByUserId,
    getSpaceById,
    getFilteredSpaces,
    saveSpace,
    updateSpace,
    deleteSpace
}