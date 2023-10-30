-- Insertar datos en la tabla CLIENTE
INSERT INTO CLIENTE (id_cliente) VALUES (1), (2), (3);

-- Insertar datos en la tabla CLIENTE_REGISTRADO
INSERT INTO CLIENTE_REGISTRADO (id_cliente, nif, nombre, apellidos, email, contraseña, pregunta, respuesta, fecha_nacimiento, estado_civil, fecha_primera_compra, fecha_ultima_compra, importe_acumulado_compras, numero_compras, baja_logica) VALUES
(1, '12345678X', 'Ana', 'Martínez', 'ana.martinez@example.com', 'ana123', '¿Cuál es tu color favorito?', 'Azul', '1990-01-01', 'Soltero/a', '2023-01-01', '2023-03-01', 150.00, 3, FALSE),
(2, '23456789Y', 'Carlos', 'García', 'carlos.garcia@example.com', 'carlos456', '¿Cuál es el nombre de tu primera mascota?', 'Luna', '1985-02-02', 'Casado/a', '2023-02-01', '2023-04-01', 200.00, 4, FALSE),
(3, '34567890Z', 'Lucía', 'Pérez', 'lucia.perez@example.com', 'lucia789', '¿Cuál es tu ciudad natal?', 'Sevilla', '1992-03-03', 'Soltero/a', NULL, NULL, 0.00, 0, TRUE);

-- Insertar datos en la tabla CLIENTE_NO_REGISTRADO
INSERT INTO CLIENTE_NO_REGISTRADO (id_cliente) VALUES (4), (5);

-- Insertar datos en la tabla TIPO_CLIENTE
INSERT INTO TIPO_CLIENTE (id_tipo_cliente, dto) VALUES (1, 0.10), (2, 0.15);

-- Insertar datos en la tabla DESC_TIP_CLI
INSERT INTO DESC_TIP_CLI (id_tipo_cliente, descripcion_tipo_cliente) VALUES (1, 'Cliente Estándar'), (2, 'Cliente Premium');

-- Insertar datos en la tabla ASOCIACION
INSERT INTO ASOCIACION (id_cliente, id_tipo_cliente) VALUES (1, 1), (2, 2);

-- Insertar datos en la tabla PRODUCTO
INSERT INTO PRODUCTO (id_producto, precio_actual, es_oferta, precio_oferta, reserva_inicial, reserva_actual, reserva_notificacion) VALUES
(1, 10.00, FALSE, NULL, 100, 90, 10),
(2, 20.00, TRUE, 15.00, 50, 40, 5),
(3, 30.00, FALSE, NULL, 200, 190, 20),
(4, 40.00, TRUE, 30.00, 150, 140, 15),
(5, 50.00, FALSE, NULL, 300, 290, 30);

-- Insertar datos en la tabla CATEGORIA
INSERT INTO CATEGORIA (id_categoria,nombre) VALUES (1,'Electrónica'), (2,'Ropa');

-- Insertar datos en la tabla ASIGNAR
INSERT INTO ASIGNAR (id_producto,id_categoria) VALUES (1 ,1), (2 ,2), (3 ,2), (4 ,2), (5 ,2);

-- Insertar datos en la tabla DESC_PROD
INSERT INTO DESC_PROD (id_producto ,descripcion_corta ,descripcion_larga) VALUES
(1 ,'Smartphone' ,'Smartphone de última generación con pantalla OLED y cámara triple'),
(2 ,'Camiseta' ,'Camiseta de algodón orgánico con estampado ecológico'),
(3 ,'Pantalón' ,'Pantalón vaquero de corte recto y tiro medio'),
(4 ,'Zapatillas' ,'Zapatillas deportivas de piel con suela de goma'),
(5 ,'Gorra' ,'Gorra de béisbol con visera curva');

-- Insertar datos en la tabla FORMA_ENVIO
INSERT INTO FORMA_ENVIO (id_envio) VALUES (1), (2);

-- Insertar datos en la tabla FORMA_PAGO
INSERT INTO FORMA_PAGO (id_pago) VALUES (1), (2);

-- Insertar datos en la tabla PEDIDO
INSERT INTO PEDIDO (id_pedido,id_cliente,total_pedido ,fecha_pedido,hora_inicio_compra,hora_final_compra,direc_ip_compra,num_transaccion ,fecha_transaccion,id_resultado_tansaccion,id_pago,id_envio ,fecha_entrega,hora_entrega) VALUES
(1 ,1 ,50.00 ,'2023-05-01','10:00:00','10:30:00','192.168.0.1','1234567890','2023-05-01' ,1 ,1 ,1 ,'2023-05-03','12:00:00'),
(2 ,2 ,30.00 ,'2023-05-02','11:00:00','11:15:00','192.168.0.2','2345678901','2023-05-02' ,2 ,2 ,2 ,'2023-05-04','14:00:00');

-- Insertar datos en la tabla LINEA_PEDIDO
INSERT INTO LINEA_PEDIDO (id_linea,id_pedido,id_producto,descripcio,unidades,precio_unitario_bruto,dto,precio_neto) VALUES
(1 ,1 ,1 ,'Smartphone',1 ,500.00 ,0.10 ,450.00),
(2 ,2 ,2 ,'Camiseta',2 ,20.00 ,0.05 ,38.00);
