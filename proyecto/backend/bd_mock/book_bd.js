// array de reservas
let books = []; 
let bookId =0;
// función para añadir una reserva nueva
const saveBook = (data, price, spaceId, userId) => {

    const { userName, hotel, spaceName, location, address, type, distribution, startTime, endTime, equipment } = data;

    books.push({
        bookId: bookId++,
        spaceId,
        userId,
        userName,
        hotel,
        spaceName,
        location,
        address,
        type,
        distribution,
        startTime,
        endTime,
        equipment,
        price
    })

}
// recuperación de las reservas de un espacio determinado
const getBooksBySpace = (spaceId) => {   
    return books.filter(book => book.spaceId === spaceId)
}
// búsqueda de un reserva determinada según su id
const getBookById = (id) => {
    return books.find(book => book.bookId === id)
}
// recuperación de las reservas de un usuario determinado
const getBooks = (userId) => {
    return books.filter(book => book.userId === userId);
}
// borrado de una reserva
const deleteBook = (id) => {
    books = books.filter(book => book.bookId !== id);
}

module.exports = {
    saveBook,
    getBooksBySpace,
    getBookById,
    getBooks,
    deleteBook
}