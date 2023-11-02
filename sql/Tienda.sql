-- Crear la tabla CLIENTE
CREATE TABLE CLIENTE
(
    id_cliente INT AUTO_INCREMENT PRIMARY KEY
);

-- Crear la tabla CLIENTE_REGISTRADO
CREATE TABLE CLIENTE_REGISTRADO
(
    id_cliente INT PRIMARY KEY REFERENCES CLIENTE (id_cliente),
    nombre     VARCHAR(255)        NOT NULL,
    usuario    VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255)        NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL
);

-- Crear la tabla CLIENTE_NO_REGISTRADO
CREATE TABLE CLIENTE_NO_REGISTRADO
(
    id_cliente INT PRIMARY KEY REFERENCES CLIENTE (id_cliente),
    email      VARCHAR(255) UNIQUE NOT NULL
);

-- Crear la tabla CATEGORIA
CREATE TABLE CATEGORIA
(
    id_categoria INT PRIMARY KEY,
    nombre       VARCHAR(50) NOT NULL
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
    id_cliente      INT REFERENCES CLIENTE (id_cliente),
    direccion_envio VARCHAR(255) NOT NULL,
    fecha_pedido    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla DETALLES_PEDIDO
CREATE TABLE DETALLES_PEDIDO
(
    id_detalle      INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido       INT REFERENCES PEDIDO (id_pedido),
    id_producto     INT REFERENCES PRODUCTO (id_producto),
    cantidad        INT            NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10, 2) NOT NULL
);
