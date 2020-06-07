let products = []; // array del acatálogo de productos
let globalId = 0; // id de los productos inicializado a 0

// función para filtar productos por nombre
const filterProducts = name => products.filter(product => product.name === name);
// Función para listar productos
const list = (req, res) => {
    
    const { name } = req.query;
    if(name){ // Si el usuario quiere filtrar por nombre en la url
        res.json(filterProducts(name));
    } else { // lista completa
        res.json(products);
    }
    
}

// Función que comprueba si existe algún producto con un nombre determinado
const isEqual = name => products.find(product => product.name === name);

// Función para añadir productos nuevos
const add = (req, res) => {
    
    const { name, stock, price } = req.body;

    // Comprobación del paso de los parámetros requeridos
    if( !name || !stock || !price ){
        res.status(400).send(); // Error por falta de parámetros
        return;
    }

    // Comprobación de si el producto ya existe
    if(isEqual(name)){
        res.status(409).send(); // error de conflicto, el producto ya existe
        return;
    }

    // Se crea el producto
    let product = {
        id: globalId++,
        name,
        stock,
        price
    };

    // Se añade el producto al array de productos
    products.push(product);

    res.send();
}

// Función para modificar un producto
const change = (req, res) => {

    let id = parseInt(req.params.id);
    
    const { name, stock, price } = req.body;
    
    if( !name || !stock || !price ){
        res.status(400).send(); // Error por falta de parámetros
        return;
    }
    // Buscamos el producto en el array a traves de su id
    let searchedProduct = products.find(item => item.id === id);

    // sobreescribimos los anteriores valores del producto con los actualizados
    searchedProduct.name = name;
    searchedProduct.stock = stock;
    searchedProduct.price = price;
    
    res.send();
}

module.exports = {
    add,
    list,
    change
}
