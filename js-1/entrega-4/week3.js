// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/posts/1

// a) Generar contador de mensajes por usario
// b) Generar una lista con la siguiente estructura:
/*[
    {
        userId: <userId>,
        posts: [
            {
                title: <title>
                body: <body>     // hay que obtenerlo de la segunda petición
            },
            {
                title: <title>
                body: <body>
            },
        ]
    }

]
*/

const axios = require('axios');

const URL_POST = 'https://jsonplaceholder.typicode.com/posts/';

//función que realiza una petición asíncrona y que devuelve un array de usuarios con sus respectivos posts
async function getPosts() {
    // almacenamos en posts los datos que devuelve la petición a la URL
    const posts = await axios.get(URL_POST); 
    // devolvemos el campo data, que es un array con todos los posts
    return posts.data;   
}

getPosts() //llamada a la función
    .then(resp => { //empezamos a trabajar con el array devuelto por la misma

        let counter = {}; //objeto que almacena el número de posts por usuario
        for (post of resp) { //recorremos el array de posts
            if (counter[post.userId] != undefined) {
                counter[post.userId]++; // si el usuario existe se le añade un post
            } else {
                counter[post.userId] = 1; // si el usuario no existe se crea con su contador a 1
            }
        }
        console.log(counter);
    })
    .catch(e => console.log('Error en la petición'));
   // Devolvemos este mensaje en caso de error en la ejecución
                     


// función que realiza primero una petición de todos los posts y a partir del id de cada post realiza una petición múltiple de cada uno de los posts
async function getPostsByUser(){

    const posts = await axios.get(URL_POST); // primera petición  
    const postsList = posts.data;

    const total = [];
    for(let post of postsList){
        let response = axios.get(`${URL_POST}${post.id}`);
        total.push(response) // vamos guardando cada post en un array        
    }
    const result = await Promise.all(total); // petición múltiple
    const resp = result.map(post => post.data); // nos quedamos con el campo data de cada respuesta, que contiene cada post 
    
    return resp; // retornamos el array de posts
} 

 getPostsByUser() //llamada a la función
    .then(posts => { // empezamos a trabajar con el array de posts

        // en el array de posts, estos están ordenados por usuario y de 10 en 10, por lo que recorro el array de 10 en 10 para quedarme con los 10 usuarios y con otro bucle interior almacenar los posts de cada usuario

        const usersPosts = []; // array para almacenar la solución planteada en el apartado b (lista de usuarios con sus posts)
        for (let i=0; i<posts.length; i+=10){
            let user={}; // objeto para guardar cada usuario y sus posts
            let list = []; // array para guardar los posts de cada usuario
            for (let a=0 ;a<10; a++){
                let post={}; // objeto para guardar cada post
                post['title']=posts[a].title;
                post['body']=posts[a].body;            
                list.push(post);
            }
            // cada usuario tiene dos atributos su id y sus posts
            user['userId']=posts[i].userId;
            user['posts']=[...list];
            usersPosts.push(user); // guardo cada objeto en el array
        }
       
        for(user of usersPosts){
            console.log(user);            
        }
        
    })
    .catch(e => console.log('Error en la petición'));
    // Devolvemos este mensaje en caso de error en la ejecución