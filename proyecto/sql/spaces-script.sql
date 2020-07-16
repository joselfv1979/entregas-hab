-- Spaces BBDD

-- users (#id, name, surname, email, password, role)
-- books (#id, type, layout, furniture, wifi, projector, screen, attendees, book_date, start_time, end_time, rating, review, price, -user_id, -space_id)
-- spaces (#id, name, hotel, city, address, description, price, meeting_type, hall_type, u_layout, class_layout, theater_layout, image1, image2, -user_id)

-- La tabla 'users' almacena usuarios de tipo proveedor de espacios (providers), buscador de espacios (seekers) 
-- y un usuario administrador pre-insertado en el script. El campo 'role' se utiliza para diferenciarlos, 
-- y junto con el id de usuario forman parte del token que se le entrega al usuario una vez logueado, 
-- para poder acceder posteriormente a diferentes funcionalidades de la aplicación. Las contraseñas de los usuarios se cifran mediante la método SHA1() en
-- la consulta 'insert' de la función de registro de usuario.

-- La tabla 'books' guarda las resevas realizadas sobre un espacio determinado, tiene como claves ajenas el id de usuario de la tabla 'users', para identificar
-- al usuario que realiza cada reserva y el id del espacio (tabla 'spaces') sobre el que se realiza la reserva. EL 'rating' y el 'review' de usuario se guarda
-- en esta tabla, si a posteriori el usuario quiere realizar una valoración sobre su experiencia de la reserva, mediante una consulta 'update'. 

-- La tabla 'spaces' almacena los espacios añadidos por los usuarios proveedores a la aplicación, tiene como clave ajena el id del usuario proveedor del espacio, 
-- el resto de campos son las características que ofrecen cada espacio. Las imágenes se almacenan en un campo de tipo varchar que referencia la ruta del sistema
-- que las va a guardar.

-- La tabla 'days' guarda los días de la semana del 0 al 6, que está disponible cada espacio.

CREATE DATABASE spaces;
CREATE USER spaces IDENTIFIED BY 'spaces';
GRANT ALL PRIVILEGES ON spaces.* TO spaces;

USE spaces;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE users (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(30) NOT NULL
);

INSERT INTO users(name, surname, email, password, role)
VALUES('admin', '', 'admin@gmail.com', SHA1('admin'), 'admin');

CREATE TABLE books (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(30),
    layout VARCHAR(30),
    furniture BOOLEAN,
    wifi BOOLEAN,
    projector  BOOLEAN,
    screen BOOLEAN,
    attendees INT DEFAULT 0,
    book_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_time DATETIME,
    end_time DATETIME,
    rating INT DEFAULT NULL,
    review TEXT,
    price decimal(5,2) DEFAULT 0, -- decimal
    user_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    space_id INT UNSIGNED,
    FOREIGN KEY (space_id) REFERENCES spaces(id)
);

CREATE TABLE spaces (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    hotel VARCHAR(50),
    city VARCHAR(30),
    address VARCHAR(50),
    description TEXT,
    price decimal(5,2) DEFAULT 0, -- decimal
    meeting_type BOOLEAN,
    hall_type BOOLEAN,
    u_layout BOOLEAN,
    class_layout BOOLEAN,
    theater_layout BOOLEAN,
    furniture BOOLEAN,
    wifi BOOLEAN,
    projector  BOOLEAN,
    screen BOOLEAN,
    image_1 VARCHAR(500),
    image_2 VARCHAR(500),
    open_hour int,
    close_hour int,
    user_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE days (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    day int,
    space_id INT UNSIGNED,
    FOREIGN KEY (space_id) REFERENCES spaces(id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS = 1;



 
