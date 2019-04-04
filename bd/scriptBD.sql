CREATE DATABASE inventario_op; 
USE inventario_op;

CREATE TABLE `cat_estados` (
  `id_estado` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a cada estado',
  `descripcion` VARCHAR(50) NOT NULL COMMENT 'Campo para escribir una descripcion del estado',
  `usuario_creo` INT COMMENT 'Id del usuario que creo el registro',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de cracion del registro',
  `fecha_actualizacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
  `eliminado` BIT DEFAULT 0 COMMENT 'La utilidad de activar o desactivar registro', 
  PRIMARY KEY (`id_estado`))
COMMENT = 'Tabla para englobar los tipos de objetos por categorias';

INSERT INTO cat_estados (descripcion,usuario_creo) VALUES("Bueno",1);
INSERT INTO cat_estados (descripcion,usuario_creo) VALUES("Regular",1);
INSERT INTO cat_estados (descripcion,usuario_creo) VALUES("Malo",1);


CREATE TABLE `usuarios` (
  `id_usuarios` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a un nuevo usuario',
  `nombre` VARCHAR(25) NOT NULL COMMENT 'Nombre del usuario',
  `apellidos` VARCHAR(40) NOT NULL COMMENT 'Los apellidos del usuario',
  `correo` VARCHAR(50) NOT NULL COMMENT 'Correo electronico del usuario',
  `telefono` VARCHAR(14) NOT NULL COMMENT 'Nunero telefonico del usuario',
  `nombre_usuario` VARCHAR(20) NOT NULL COMMENT 'Nomre de usuario para logueo',
  `contrasena` VARCHAR(15) NOT NULL COMMENT 'Contraseña del usuario para logeo',
  `cargo_usuario` INT NOT NULL COMMENT 'Clasificacion del usuario,capturiasta o encargado de inventario',
  `estado` VARCHAR(25) NOT NULL COMMENT 'Informa el estado actual del usuario',
  `usuario_creo` INT COMMENT 'Id del usuario que creo el registro',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de cracion del registro',
  `fecha_actualizacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
  `eliminado` BIT DEFAULT 0 COMMENT 'La utilidad de activar o desactivar registro',
  PRIMARY KEY (`id_usuarios`))
COMMENT = 'Tabla para Guardar la informacion de los usarios del sistema';

INSERT INTO usuarios(nombre,apellidos,correo,telefono,nombre_usuario,contrasena,cargo_usuario,estado,usuario_creo) VALUES("RAUL","ANDRADE ALVARADO","140300088@ucaribe.edu.mx","9981176050","RAAAUL","9982003508R",1,"ACTIVO",1);


CREATE TABLE `objetos` (
  `id_objetos` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a un nuevo usuario',
  `fecha_ingreso` DATETIME NOT NULL COMMENT 'Fecha de ingrso del objeto, fomato YYYY-MM-DD-HH:MM:SS',
  `fecha_egreso` DATETIME NOT NULL COMMENT 'Fecha de salida del objeto, fomato YYYY-MM-DD-HH:MM:SS',
  `lugar_hallazgo` VARCHAR(25) NOT NULL COMMENT 'Nombre del Area donde se encontro el objeto',
  `etiquetas` INT NOT NULL COMMENT 'Llave foranea para las etiquetas de caracteristicas',
  `informacion_adicional` VARCHAR(100) NOT NULL COMMENT 'Datos extra sobre el objeto al entrar al inventario',
  `usuario_encontro` INT NOT NULL COMMENT 'Llave foranea al tipo de usuario que encotro el objeto',
  `usuario_recibio` INT NOT NULL COMMENT 'Llave foranea  al tipo de usuario que recibio el objeto en almacen',
  `usuario_registro_entrada` INT NOT NULL COMMENT 'Llave foranea  al tipo de usuario que registro el objeto en el sistema',
  `usuario_registro_salida` INT NOT NULL COMMENT 'Llave foranea  al tipo de usuario que registro la sealida del objeto',
  `estado` INT NOT NULL COMMENT 'Informa el estado actual del objeto',
  `usuario_creo` INT COMMENT 'Id del usuario que creo el registro',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de cracion del registro',
  `fecha_actualizacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
  `eliminado` BIT DEFAULT 0 COMMENT 'La utilidad de activar o desactivar registro',
  FOREIGN KEY(estado) REFERENCES cat_estados(id_estado),
  PRIMARY KEY (`id_objetos`))
COMMENT = 'Tabla para guardar la informacion de los objetos perdidos registrados en el sistema';

CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada cada tipo de usuario',
  `nombre_tipoUsuario` VARCHAR(25) NOT NULL COMMENT 'Nombre de tipo de Usuario',
  `datos_tipousuario` VARCHAR(50) NOT NULL COMMENT 'Campo para escribir datos para contactar al tipo de usuario',
  `devolucion` BINARY  NOT NULL COMMENT 'Campo que nos permitira saber si a este usuario se le puede regresar el objeto que entrego',
  `usuario_creo` INT COMMENT 'Id del usuario que creo el registro',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de cracion del registro',
  `fecha_actualizacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
  `eliminado` BIT DEFAULT 0 COMMENT 'La utilidad de activar o desactivar registro',
  PRIMARY KEY (`id_tipo_usuario`))
COMMENT = 'Tabla para englobar los ipos de usuario';

/*Esta es la segunda parte de las tablas*/

CREATE TABLE `categorias` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a cada categoria de objetos',
  `descripcion` VARCHAR(50) NOT NULL COMMENT 'Campo para escribir una descripcion de la categoria',
  `usuario_creo` INT COMMENT 'Id del usuario que creo el registro',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de cracion del registro',
  `fecha_actualizacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
  `eliminado` BIT DEFAULT 0 COMMENT 'La utilidad de activar o desactivar registro', 
  PRIMARY KEY (`id_categoria`))
COMMENT = 'Tabla para englobar los tipos de objetos por categorias';

INSERT INTO categorias (descripcion,usuario_creo) VALUES("Electrónico",1);
INSERT INTO categorias (descripcion,usuario_creo) VALUES("Papelería",1);
INSERT INTO categorias (descripcion,usuario_creo) VALUES("Vestimenta",1);
INSERT INTO categorias (descripcion,usuario_creo) VALUES("Personal",1);
INSERT INTO categorias (descripcion,usuario_creo) VALUES("Equipamento",1);
INSERT INTO categorias (descripcion,usuario_creo) VALUES("Otro",1);

CREATE TABLE `cat_sub_categorias` (
  `id_sub_categoria` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a cada subcategoria de objetos',
  `id_categoria` INT NOT NULL COMMENT 'Llave foranea a la Categoria principal',
  `nombre_categoria` VARCHAR(20) NOT NULL COMMENT 'Nombre de tipo de subCategoria',
  `descripcion` VARCHAR(50) NOT NULL COMMENT 'Campo para escribir una descripcion de la Subcategoria',
  `usuario_creo` INT COMMENT 'Id del usuario que creo el registro',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de cracion del registro',
  `fecha_actualizacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
  `eliminado` BIT DEFAULT 0 COMMENT 'La utilidad de activar o desactivar registro', 
 PRIMARY KEY (`id_sub_categoria`),
  FOREIGN KEY(id_sub_categoria) REFERENCES categorias(id_categoria))
COMMENT = 'Tabla para englobar los tipos de objetos por Subcategorias';

CREATE TABLE `etiquetas` (
  `id_etiquta` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a cada etiqueta',
  `nombre_etiqueta` VARCHAR(20) NOT NULL COMMENT 'Nombre de la etiqueta',
  `usuario_creo` INT COMMENT 'Id del usuario que creo el registro',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de cracion del registro',
  `fecha_actualizacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
  `eliminado` BIT DEFAULT 0 COMMENT 'La utilidad de activar o desactivar registro',
  PRIMARY KEY (`id_etiquta`))
COMMENT = 'Tabla para obtener las etiquetas para busqueda de objetos';

/*show create table objetos;*/

/*Correccion de llaves foraneas de la tabla objetos*/
ALTER TABLE objetos ADD FOREIGN KEY(usuario_recibio) REFERENCES usuarios(id_Usuarios);
ALTER TABLE objetos ADD FOREIGN KEY(usuario_registro_entrada) REFERENCES usuarios(id_usuarios);
ALTER TABLE objetos ADD FOREIGN KEY(usuario_registro_salida) REFERENCES usuarios(id_usuarios);
