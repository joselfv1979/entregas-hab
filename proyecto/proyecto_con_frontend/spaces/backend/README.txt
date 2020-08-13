Entrega de la parte de backend de una aplicación REST para la gestión de espacios de hoteles. 
La estructura es la siguiente:
- index.js: archivo principal. Crea la aplicación express, importa las librerías necesarias y define las rutas de los endpoints y middlewares principales.
- routes: directorio que contiene los endpoints de entrada a la aplicación con sus respectivas funcionalidades que gestionan los usuarios (users.js y profiles.js), los espacios (spaces.js) y las reservas de espacios (books.js).
- controllers: directorio en el que se encuentran las funcionalidades que responden a las peticiones para listar, crear, editar y eliminar los objetos usuario (userController.js, profileController.js), espacio (spaceController.js) y reserva (bookController.js).
- services: directorio que contiene las funciones de inserción, modificación, eliminación y consulta de datos sobre los objetos usuario (userService.js), espacio (spaceService.js) y reserva (bookService.js).
- utils: directorio que incluye las funcionalidades de envío de emails (mail_util.js), obtención de horas de reserva (time_util.js) y configuración de la conexión con la base de datos (database.js).
- middlewares: el archivo auth.js contiene los middlewares de autenticación a partir del token entregado al usuario una vez que se loguea.
- logs: registro de logs de peticiones, cada log consta de la dirección ip desde la que se realiza la petición, fecha, URL, tipo de petición y código de respuesta.
