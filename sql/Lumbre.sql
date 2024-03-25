CREATE DATABASE Lumbre;

USE Lumbre;

CREATE TABLE HABITANTES(
    id_habitante INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE FLAG(
    id_flag INT AUTO_INCREMENT PRIMARY KEY,
    id_habitante INT,
    flag VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_habitante) REFERENCES HABITANTES (id_habitante)
);

INSERT INTO HABITANTES(nombre, edad, telefono, email)
VALUES ('Riebeck', 34, '123', 'riebeck@lumbre.com'),
       ('Chert', 25, '543', 'chert@lumbre.com'),
       ('Gabbro', 30, '896', 'gabbro@lumbre.com'),
       ('Feldespar', 29, '842', 'feldespar@lumbre.com'),
       ('Esker', 35, '985', 'esker@lumbre.com'),
       ('Hornfels', 40, '425', 'hornfels@lumbre.com');

INSERT INTO FLAG(id_habitante, flag)
VALUES (1, 'La primera coordenada al Ojo del Universo: flag{V2VsY29tZQ==}');
