// IMPORTACIÓN DE LIBRERÍAS EXTERNAS
import axios from "axios";
import Swal from "sweetalert2";

// VARIABLE QUE GUARDA LA DIRECCIÓN DEL SERVIDOR
const ENDPOINT = 'http://localhost:8000'

// FUNCIÓN QUE REALIZA LA PETICIÓN PARA CREAR UNA RESERVA NUEVA
export async function createBook(token, spaceId, type, layout, furniture, wifi, projector, screen, attendees, startTime, endTime) {

    try {
        const book = await axios
            .post("http://localhost:8000/books", {
                spaceId, type, layout, furniture, wifi, projector, screen, attendees, startTime, endTime
            },
                {
                    headers: { 'Authorization': `${token}` }
                })
        return book.data;
    } catch (error) {
        console.log(error);
    }
}

// FUNCIÓN QUE REALIZA LA PETICIÓN PARA RECUPERAR UNA RESERVA DETERMINADA
export async function getBook(token, spaceId, bookId) {

    try {
        const book = await axios
            .get(`http://localhost:8000/books/seekers/${bookId}?spaceId=${spaceId}`,
                {
                    headers: { 'Authorization': `${token}` }
                })
        console.log(book.data);
        return book.data;
    } catch (error) {
        console.log(error);
    }
}

// FUNCIÓN QUE REALIZA LA PETICIÓN PARA RECUPERAR LAS RESERVAS DE UN USUARIO
export async function getBooks(token) {

    try {
        const books = await axios
            .get(`http://localhost:8000/books/seekers`,
                {
                    headers: { 'Authorization': `${token}` }
                })
        console.log(books.data);
        return books;
    } catch (error) {
        console.log(error);
    }
}

// FUNCIÓN PARA AÑADIR UNA VALORACIÓN
export async function addScore(token, index, rating, review) {
    try {
        await axios
            .post(`http://localhost:8000/books/${index}`,
                {
                    rating, review
                },
                {
                    headers: { 'Authorization': `${token}` }
                })
    } catch (error) {
        console.log(error);
    }
}