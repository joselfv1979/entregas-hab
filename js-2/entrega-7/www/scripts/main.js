// Array que almacena los botones de reserva de cada hotel
const buttons = document.querySelectorAll('.book')
// variable que guarda la sección del aside donde se crea la lista de reservas
const section = document.querySelector('.account')
// variable que almacena el botón para borrar la lista de reservas completa
const clearAll = document.querySelector('.delete-all-books')

// función que recoge los datos necesarios del HTML (nombre, precio y URL de la imagen) para crear una nueva reserva y la pasa a como parámetro a la función de añadir reservas
const catchBookData = e => {
    const hotelName = e.target.parentElement.previousElementSibling.firstElementChild.firstElementChild.textContent
    const hotelPrice = e.target.parentElement.previousElementSibling.firstElementChild.lastElementChild.textContent
    const hotelImage = e.target.parentElement.parentElement.firstElementChild.firstElementChild.src
    const bookData = {}
    bookData.name = hotelName
    bookData.price = hotelPrice
    bookData.image = hotelImage
    addBookList(bookData)    
}

// función que carga los datos del array de reservas en el "localStorage" y crea un "article" por cada reserva, con todos sus elementos (texto, imagen y botón) y finalmente los añade al "section" del "aside"
const createBookList = books => {  
    localStorage.setItem('books', JSON.stringify(books))
    section.innerHTML = ''
    books.forEach((bookData, i) => {
        const image = document.createElement('img')
        image.setAttribute('src', bookData.image)
        const price = document.createElement('p')
        price.textContent = bookData.price
        const hotel = document.createElement('p')
        hotel.textContent = bookData.name
        const button = document.createElement('button')
        button.className = 'delete-book'
        button.textContent = 'CANCEL'
        button.addEventListener('click', () => deleteBook(i))
        // listener que llama a la función que elimina cada reserva
        const article = document.createElement('article')
        article.appendChild(image)
        article.appendChild(hotel)
        article.appendChild(price)
        article.appendChild(button)
        article.classList = 'item-book'
        section.appendChild(article)
    })
}

// función que carga el array de reservas almacenado en el "localStorage" y elimina la reserva correspondiente a la posición que ocupa en el array
const deleteBook = index => {
    const books = loadLocalStorage()
    books.splice(index, 1)
    createBookList(books)
}

// función que elimina todas las reservas y todo lo almacenado en el "localStorage"
const deleteAllBooks = e => {
    if(e.target.classList.contains('delete-all-books')){
        const books = document.querySelectorAll('.item-book')
        books.forEach(book => book.remove()) 
        localStorage.clear()       
    }
}

// función que devuelve lo almacenado en el "localStorage"
const loadLocalStorage = () => {
    return JSON.parse(localStorage.getItem('books'))   
}

// función que añade al array de reservas cada nueva reserva junto con las que ya estaban almacenadas en el "localStorage" y llama a la función que crea las reservas
const addBookList = bookData => {   
    const books = loadLocalStorage() || []
    const newBookList = [...books, bookData]  
    createBookList(newBookList)
}

// listener de cada uno de los botones de reserva y que llama a recoger los datos
buttons.forEach(button => button.addEventListener('click', catchBookData))

// listener del botón para borrar todos los artículos
clearAll.addEventListener('click', deleteAllBooks)

// listener que recoge el evento de recarga de página y recupera los datos almacenados en el "localStorage"
document.addEventListener('DOMContentLoaded', createBookList(JSON.parse(localStorage.getItem('books'))))








