CREATE DATABASE Tienda;

USE Tienda;

-- Crear la tabla CLIENTE
CREATE TABLE CLIENTE
(
    id_cliente INT AUTO_INCREMENT PRIMARY KEY
);

-- Crear la tabla CLIENTE_REGISTRADO
CREATE TABLE CLIENTE_REGISTRADO
(
    id_cliente INT PRIMARY KEY,
    nombre     VARCHAR(255)        NOT NULL,
    usuario    VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255)        NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE (id_cliente)
);

-- Crear la tabla CLIENTE_NO_REGISTRADO
CREATE TABLE CLIENTE_NO_REGISTRADO
(
    id_cliente INT PRIMARY KEY,
    email      VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE (id_cliente)
);

-- Crear la tabla CATEGORIA
CREATE TABLE CATEGORIA
(
    id_categoria INT PRIMARY KEY,
    nombre       VARCHAR(50) NOT NULL,
    mostrar      BOOLEAN     DEFAULT TRUE
);

-- Crear la tabla PRODUCTO
CREATE TABLE PRODUCTO
(
    id_producto   INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria  INT            NOT NULL,
    nombre        VARCHAR(50)    NOT NULL,
    descripcion   VARCHAR(255)   NOT NULL,
    precio_actual DECIMAL(10, 2) NOT NULL,
    imagen_url    VARCHAR(255) UNIQUE,
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA (id_categoria)
);

-- Crear la tabla PEDIDO
CREATE TABLE PEDIDO
(
    id_pedido       INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente      INT,
    direccion_envio VARCHAR(255) NOT NULL,
    fecha_pedido    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE (id_cliente)
);

-- Crear la tabla DETALLES_PEDIDO
CREATE TABLE DETALLES_PEDIDO
(
    id_detalle      INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido       INT,
    id_producto     INT,
    cantidad        INT            NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES PEDIDO (id_pedido),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO (id_producto)
);

-- Insertar datos en la tabla CLIENTE
INSERT INTO CLIENTE VALUES (), (), (), (), (), (), (), (), (), (), ();

-- Insertar datos en la tabla CLIENTE_REGISTRADO
INSERT INTO CLIENTE_REGISTRADO (id_cliente, nombre, usuario, contraseña, email)
VALUES (1, 'Riebeck', 'riebeck', 'I.Play_Th3_8anjo', 'riebeck@lumbre.com')
       (2, 'Ana', 'ana123', 'ana123', 'ana@example.com'),
       (3, 'Carlos', 'carlos34', 'carlos456', 'carlos@example.com'),
       (4, 'Lucía', 'lulu33', 'lucia789', 'lucia@example.com'),
       (5, 'Pedro', 'pedro123', 'pedro123', 'pedro@example.com'),
       (6, 'María', 'maria456', 'maria456', 'maria@example.com'),
       (7, 'Juan', 'juan789', 'juan789', 'juan@example.com');

-- Insertar datos en la tabla CLIENTE_NO_REGISTRADO
INSERT INTO CLIENTE_NO_REGISTRADO (id_cliente, email)
VALUES (8, 'pedro@example.com'),
       (9, 'maria@example.com'),
       (10, 'laura@example.com'),
       (11, 'david@example.com');

-- Insertar datos en la tabla CATEGORIA
INSERT INTO CATEGORIA (id_categoria, nombre, mostrar)
VALUES (1, 'Electrónica', TRUE),
       (2, 'Ropa', TRUE),
       (3, 'Libros', TRUE),
       (4, 'Música', TRUE),
       (5, 'Cine', TRUE),
       (6, 'Videojuegos', TRUE),
       (7, 'Deportes', FALSE),
       (8, 'Hogar', FALSE),
       (9, 'Juguetes', FALSE),
       (10, 'Alimentación', FALSE);

-- Insertar datos en la tabla PRODUCTO
INSERT INTO PRODUCTO (id_categoria, nombre, descripcion, precio_actual, imagen_url)
VALUES (1, 'Smartphone', 'Smartphone de última generación con pantalla OLED y cámara triple', 500.00,
        'smartphone.jpg'),
       (1, 'Portátil', 'Portátil ligero y potente con procesador Intel Core i7 y 16 GB de RAM', 800.00,
        'portatil.jpg'),
       (2, 'Camiseta', 'Camiseta de algodón orgánico con estampado ecológico', 10.00, 'camiseta.jpg'),
       (2, 'Pantalón', 'Pantalón vaquero con corte slim fit y efecto desgastado', 20.00, 'pantalon.jpg'),
       (3, 'El principito',
        'Un clásico de la literatura infantil que narra las aventuras de un niño y su amigo el zorro', 5.00,
        'principito.jpg'),
       (3, 'Harry Potter', 'La saga de libros más famosa del mundo mágico creada por J.K. Rowling', 15.00,
        'harrypotter.jpg'),
       (4, 'CD', 'CD de música con las mejores canciones del año', 10.00, 'cd.jpg'),
       (4, 'Vinilo', 'Vinilo de música con un diseño retro y una calidad de sonido superior', 20.00,
        'vinilo.jpg'),
       (5, 'DVD', 'DVD de cine con una película de acción y aventura', 15.00, 'dvd.jpg'),
       (5, 'Blu-ray', 'Blu-ray de cine con una película de ciencia ficción y efectos especiales', 25.00,
        'blu-ray.jpg'),
       (6, 'Consola', 'Consola de videojuegos con un mando inalámbrico y varios juegos incluidos', 300.00,
        'consola.jpg'),
       (6, 'Juego', 'Juego de videojuegos con una historia apasionante y un modo multijugador', 50.00,
        'juego.jpg'),
       (7, 'Malvaviscos', '¡La comida favorita de Gabbro!', 2.00, 'malvaviscos.jpg');