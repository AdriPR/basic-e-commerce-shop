-- Crear la tabla CLIENTE
CREATE TABLE CLIENTE (
  id_cliente INT PRIMARY KEY
);

-- Crear la tabla CLIENTE_REGISTRADO
CREATE TABLE CLIENTE_REGISTRADO (
  id_cliente INT PRIMARY KEY REFERENCES CLIENTE(id_cliente),
  nif VARCHAR(10) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(50) NOT NULL,
  pregunta VARCHAR(200) NOT NULL,
  respuesta VARCHAR(200) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  estado_civil VARCHAR(20),
  fecha_primera_compra DATE,
  fecha_ultima_compra DATE,
  importe_acumulado_compras DECIMAL(10,2),
  numero_compras INT,
  baja_logica BOOLEAN NOT NULL
);

-- Crear la tabla CLIENTE_NO_REGISTRADO
CREATE TABLE CLIENTE_NO_REGISTRADO (
  id_cliente INT PRIMARY KEY REFERENCES CLIENTE(id_cliente)
);

-- Crear la tabla TIPO_CLIENTE
CREATE TABLE TIPO_CLIENTE (
  id_tipo_cliente INT PRIMARY KEY,
  dto DECIMAL(5,2) NOT NULL
);

-- Crear la tabla DESC_TIP_CLI
CREATE TABLE DESC_TIP_CLI (
  id_tipo_cliente INT REFERENCES TIPO_CLIENTE(id_tipo_cliente),
  descripcion_tipo_cliente VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_tipo_cliente, descripcion_tipo_cliente)
);

-- Crear la tabla ASOCIACION
CREATE TABLE ASOCIACION (
  id_cliente INT REFERENCES CLIENTE(id_cliente),
  id_tipo_cliente INT REFERENCES TIPO_CLIENTE(id_tipo_cliente),
  PRIMARY KEY (id_cliente, id_tipo_cliente)
);

-- Crear la tabla PRODUCTO
CREATE TABLE PRODUCTO (
  id_producto INT PRIMARY KEY,
  precio_actual DECIMAL(10,2) NOT NULL,
  es_oferta BOOLEAN NOT NULL,
  precio_oferta DECIMAL(10,2),
  reserva_inicial INT NOT NULL,
  reserva_actual INT NOT NULL,
  reserva_notificacion INT NOT NULL
);

-- Crear la tabla CATEGORIA
CREATE TABLE CATEGORIA (
   id_categoria INT PRIMARY KEY,
   nombre VARCHAR(50) NOT NULL
);

-- Crear la tabla ASIGNAR
CREATE TABLE ASIGNAR (
   id_producto INT REFERENCES PRODUCTO(id_producto),
   id_categoria INT REFERENCES CATEGORIA(id_categoria),
   PRIMARY KEY (id_producto, id_categoria)
);

-- Crear la tabla DESC_PROD
CREATE TABLE DESC_PROD (
  id_producto INT REFERENCES PRODUCTO(id_producto),
  descripcion_corta VARCHAR(200) NOT NULL,
  descripcion_larga VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id_producto, descripcion_corta)
);

-- Crear la tabla FORMA_ENVIO
CREATE TABLE FORMA_ENVIO (
   id_envio INT PRIMARY KEY
);

-- Crear la tabla FORMA_PAGO
CREATE TABLE FORMA_PAGO (
   id_pago INT PRIMARY KEY
);

-- Crear la tabla PEDIDO
CREATE TABLE PEDIDO (
   id_pedido INT PRIMARY KEY,
   id_cliente INT REFERENCES CLIENTE(id_cliente),
   total_pedido DECIMAL(10,2) NOT NULL,
   fecha_pedido DATE NOT NULL,
   hora_inicio_compra TIME NOT NULL,
   hora_final_compra TIME NOT NULL,
   direc_ip_compra VARCHAR(15) NOT NULL,
   num_transaccion VARCHAR(50) NOT NULL,
   fecha_transaccion DATE NOT NULL,
   id_resultado_tansaccion INT NOT NULL,
   id_pago INT REFERENCES FORMA_PAGO(id_pago),
   id_envio INT REFERENCES FORMA_ENVIO(id_envio),
   fecha_entrega DATE NOT NULL,
   hora_entrega TIME NOT NULL
);

-- Crear la tabla LINEA_PEDIDO
CREATE TABLE LINEA_PEDIDO (
   id_linea INT PRIMARY KEY,
   id_pedido INT REFERENCES PEDIDO(id_pedido),
   id_producto INT REFERENCES PRODUCTO(id_producto),
   descripcio VARCHAR(200) NOT NULL,
   unidades INT NOT NULL,
   precio_unitario_bruto DECIMAL(10,2) NOT NULL,
   dto DECIMAL(5,2) NOT NULL,
   precio_neto DECIMAL(10,2) NOT NULL
);
