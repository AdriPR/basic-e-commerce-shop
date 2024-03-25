CREATE DATABASE Lumbre;

USE Lumbre;

CREATE TABLE HABITANTES(
    id_habitante INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha_nacimiento VARCHAR(255) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE FLAG(
    id_flag INT AUTO_INCREMENT PRIMARY KEY,
    id_habitante INT,
    flag VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_habitante) REFERENCES HABITANTES (id_habitante)
);

INSERT INTO HABITANTES(nombre, fecha_nacimiento, telefono, email)
VALUES ('Riebeck', '29-11-1995', '123', 'riebeck@lumbre.com'),
       ('Chert', '04-09-1997', '543', 'chert@lumbre.com'),
       ('Gabbro', '30-10-1992', '677', 'gabbro@lumbre.com'),
       ('Feldespar', '05-04-1993', '899', 'feldespar@lumbre.com'),
       ('Esker', '07-06-1991', '985', 'esker@lumbre.com'),
       ('Hornfels', '19-09-1985', '425', 'hornfels@lumbre.com');

INSERT INTO FLAG(id_habitante, flag)
VALUES (1, 'La primera coordenada al Ojo del Universo: flag{V2VsY29tZQ}');
