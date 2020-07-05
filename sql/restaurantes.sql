-- usuarios (#id, nombre, apellidos, email, password, dirección, rol)
-- reservas (#id, fecha_hora_comienzo, fecha_hora_fin, -id_usuario, -id_restaurante)
-- comensales (#id, dni, nombre, apellidos)
-- restaurantes (#id, nombre, dirección, aforo)
-- reserva_comensal(#id, -id_reserva, -id_comensal)

USE restaurantes;

SET FOREIGN_KEY_CHECKS = 0;

create table usuarios (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50),
    apellidos VARCHAR(50),
    direccion VARCHAR(50),
    rol varchar(50),
    email VARCHAR(50) UNIQUE NOT NULL,
	contrasena VARCHAR(40) NOT NULL
);

create table reservas (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	fecha_hora_comienzo datetime,
    fecha_hora_fin datetime,
    id_usuario INT UNSIGNED,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    id_restaurante INT UNSIGNED,
    FOREIGN KEY (id_restaurante) REFERENCES restaurantes(id)
);

create table comensales (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50),
    apellidos VARCHAR(50),
    dni VARCHAR(50) 
);

create table restaurantes (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50),
    direccion VARCHAR(50),
    aforo int default 0
);

create table reserva_comensal (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	id_comensal INT UNSIGNED,
    FOREIGN KEY (id_comensal) REFERENCES comensales(id),
    id_reserva INT UNSIGNED,
    FOREIGN KEY (id_reserva) REFERENCES reservas(id)
);

SET FOREIGN_KEY_CHECKS = 1;
