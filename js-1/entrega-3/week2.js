/**
 * Entregable semana 2
 * 
 * Escribe el código necesario para decidir en qué
 * fotografías sale Pablo. Como resultado se debe
 * obtener un array de strings con los nombres de las
 * fotografías.
 *  
 */

const photos = [
    {
        name: 'Cumpleaños de 13',
        people: ['Maria', 'Pablo']
    },
    {
        name: 'Fiesta en la playa',
        people: ['Pablo', 'Marcos']
    },
    {
        name: 'Graduación',
        people: ['Maria', 'Lorenzo']
    },
]

const findPablo = (persons) => {
    for (person of persons) {
        if (person == 'Pablo') {
            return true;
        }
    }
}

const album = photos
    .filter(photo => findPablo(photo.people))
    .map(photo => photo.name) 

console.log(album);


