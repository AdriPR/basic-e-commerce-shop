-- Insertar datos en la tabla CLIENTE
INSERT INTO CLIENTE (id_cliente)
VALUES (DEFAULT),
       (DEFAULT),
       (DEFAULT),
       (DEFAULT),
       (DEFAULT),
       (DEFAULT),
       (DEFAULT),
       (DEFAULT),
       (DEFAULT),
       (DEFAULT);

-- Insertar datos en la tabla CLIENTE_REGISTRADO
INSERT INTO CLIENTE_REGISTRADO (id_cliente, nombre, usuario, contraseña, email)
VALUES (1, 'Ana', 'ana123', 'ana123', 'ana@example.com'),
       (2, 'Carlos', 'carlos34', 'carlos456', 'carlos@example.com'),
       (3, 'Lucía', 'lulu33', 'lucia789', 'lucia@example.com'),
       (4, 'Pedro', 'pedro123', 'pedro123', 'pedro@example.com'),
       (5, 'María', 'maria456', 'maria456', 'maria@example.com'),
       (6, 'Juan', 'juan789', 'juan789', 'juan@example.com');

-- Insertar datos en la tabla CLIENTE_NO_REGISTRADO
INSERT INTO CLIENTE_NO_REGISTRADO (id_cliente, email)
VALUES (7, 'pedro@example.com'),
       (8, 'maria@example.com'),
       (9, 'laura@example.com'),
       (10, 'david@example.com');

-- Insertar datos en la tabla CATEGORIA
INSERT INTO CATEGORIA (id_categoria, nombre)
VALUES (1, 'Electrónica'),
       (2, 'Ropa'),
       (3, 'Libros'),
       (4, 'Música'),
       (5, 'Cine'),
       (6, 'Videojuegos');

-- Insertar datos en la tabla PRODUCTO
INSERT INTO PRODUCTO (id_producto, id_categoria, nombre, descripcion, precio_actual, imagen_url)
VALUES (DEFAULT, 1, 'Smartphone', 'Smartphone de última generación con pantalla OLED y cámara triple', 500.00,
        'smartphone.jpg'),
       (DEFAULT, 1, 'Portátil', 'Portátil ligero y potente con procesador Intel Core i7 y 16 GB de RAM', 800.00,
        'portatil.jpg'),
       (DEFAULT, 2, 'Camiseta', 'Camiseta de algodón orgánico con estampado ecológico', 10.00, 'camiseta.jpg'),
       (DEFAULT, 2, 'Pantalón', 'Pantalón vaquero con corte slim fit y efecto desgastado', 20.00, 'pantalon.jpg'),
       (DEFAULT, 3, 'El principito',
        'Un clásico de la literatura infantil que narra las aventuras de un niño y su amigo el zorro', 5.00,
        'principito.jpg'),
       (DEFAULT, 3, 'Harry Potter', 'La saga de libros más famosa del mundo mágico creada por J.K. Rowling', 15.00,
        'harrypotter.jpg'),
       (DEFAULT, 4, 'CD', 'CD de música con las mejores canciones del año', 10.00, 'cd.jpg'),
       (DEFAULT, 4, 'Vinilo', 'Vinilo de música con un diseño retro y una calidad de sonido superior', 20.00,
        'vinilo.jpg'),
       (DEFAULT, 5, 'DVD', 'DVD de cine con una película de acción y aventura', 15.00, 'dvd.jpg'),
       (DEFAULT, 5, 'Blu-ray', 'Blu-ray de cine con una película de ciencia ficción y efectos especiales', 25.00,
        'blu-ray.jpg'),
       (DEFAULT, 6, 'Consola', 'Consola de videojuegos con un mando inalámbrico y varios juegos incluidos', 300.00,
        'consola.jpg'),
       (DEFAULT, 6, 'Juego', 'Juego de videojuegos con una historia apasionante y un modo multijugador', 50.00,
        'juego.jpg');
