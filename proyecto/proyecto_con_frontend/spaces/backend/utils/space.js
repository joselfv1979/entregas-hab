// IMPORTACIÓN DE LIBRERÍAS EXTERNAS
import axios from "axios";
import Swal from "sweetalert2";

// VARIABLE QUE GUARDA LA DIRECCIÓN DEL SERVIDOR
const ENDPOINT = 'http://localhost:8000/spaces'

// FUNCIÓN PARA GUARDAR EL ID DEL ESPACIO EN EL LOCALSTORAGE
export function setSpaceId(spaceId) {
    localStorage.setItem("SPACEID", spaceId);
}
// FUNCIÓN PARA RECUPERAR EL ID DESDE EL LOCALSTORAGE
export function getSpaceId() {
    return localStorage.getItem("SPACEID");
}
// FUNCIÓN PARA BORRAR EL ID DEL LOCALSTORAGE
export function removeSpaceId() {
    localStorage.removeItem("SPACEID")
}
// FUNCIÓN PARA GUARDAR EL OBJETO ESPACIO EN EL LOCALSTORAGE
export function setSpace(space) {
    localStorage.setItem("SPACE", JSON.stringify(space))
}
// FUNCIÓN PARA RECUPERAR EL OBJETO ESPACIO EN EL LOCALSTORAGE
export function getSpace() {
    let space = JSON.parse(localStorage.getItem("SPACE"))
    return space
}
// FUNCIÓN PARA BORRAR EL OBJETO ESPACIO EN EL LOCALSTORAGE
export function removeSpace() {
    localStorage.removeItem("SPACE")
}
// FUNCIÓN PARA PEDIR LA LISTA DE ESPACIOS FILTRADA POR PARÁMETROS AL SERVIDOR 
export async function getFilteredSpaces(parameters) {
    try {
        const response = await axios.get(`${ENDPOINT}${parameters}`)
        return response
    } catch (error) {
        console.log(error);
    }
}
// FUNCIÓN PARA PEDIR LA LISTA DE ESPACIOS DE CADA PROVEEDOR AL SERVIDOR 
export async function getPlaces(token) {
    try {
        const response = await axios.get(`${ENDPOINT}/provider`, {
            headers: { 'Authorization': `${token}` }
        })
        return response
    } catch (error) {
        console.log(error);
    }
}
// FUNCIÓN PARA PEDIR UN ESPACIO DETERMINADO AL SERVIDOR 
export async function getSpaceById(id) {
    try {
        const response = await axios.get(`${ENDPOINT}/${id}`)
        return response
    } catch (error) {
        console.log(error);
    }
}
// FUNCIÓN PARA PEDIR LA LISTA DE VALORACIONES DE UN ESPACIO AL SERVIDOR 
export async function listScores(id) {
    try {
        const response = await axios.get(`${ENDPOINT}/${id}/scores`)
        return response
    } catch (error) {
        console.log(error);
    }

}
// FUNCIÓN PARA PEDIR REGISTRAR UN ESPACIO NUEVO 
export async function validateSpace(token, userId, space) {

    const { hotel, city, address, name, price, open, close, uLayout, classLayout, theaterLayout, meetingType, hallType, furniture, wifi, projector, screen, image1, image2, description } = space

    if(!hotel || !city || !address || !name || !price || !open || !close || !image1 || !image2 || !description){
        Swal.fire("No puedes dejar campos vacíos");
        return
    }

    try {
        await axios.post(`${ENDPOINT}`, {
            userId, space
        },
        {
            headers: { 'Authorization': `${token}` }
        })
        return true
    } catch (error) {
        console.log(error);
    }
}