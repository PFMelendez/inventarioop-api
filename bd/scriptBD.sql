create database Inventario_OP; 
use Inventario_OP;
CREATE TABLE `inventario_op`.`usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a un nuevo usuario',
  `nombre` VARCHAR(25) NOT NULL COMMENT 'Nombre del usuario',
  `apellidos` VARCHAR(40) NOT NULL COMMENT 'Los apellidos del usuario',
  `correo` VARCHAR(50) NOT NULL COMMENT 'Correo electronico del usuario',
  `telefono` VARCHAR(14) NOT NULL COMMENT 'Nunero telefonico del usuario',
  `contraseña` VARCHAR(10) NOT NULL COMMENT 'Contraseña del usuario para logeo',
  `nombre_usuario` VARCHAR(40) NOT NULL COMMENT 'Nomre de usuario para logueo',
  `fecha_crecion` DATE NOT NULL COMMENT 'Fecha de cracion de usuario, fomato YYYY-MM-DD',
  `fecha_actualizacion` DATE NOT NULL COMMENT 'Fecha de ultimo movimiento',
  `cargo_Usuario` VARCHAR(14) NOT NULL COMMENT 'Clasificacion del usuario,capturiasta o encargado de inventario',
  `estado` VARCHAR(25) NOT NULL COMMENT 'Informa el estado actual del usuario',
  PRIMARY KEY (`idUsuarios`),
  UNIQUE INDEX `idUsuarios_UNIQUE` (`idUsuarios` ASC) VISIBLE)
COMMENT = 'Tabla para Guardar la informacion de los usarios del sistema';

CREATE TABLE `inventario_op`.`objetos` (
  `idObjetos` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a un nuevo usuario',
  `fecha_ingreso` DATETIME NOT NULL COMMENT 'Fecha de ingrso del objeto, fomato YYYY-MM-DD-HH:MM:SS',
  `fecha_egreso` DATETIME NOT NULL COMMENT 'Fecha de salida del objeto, fomato YYYY-MM-DD-HH:MM:SS',
  `lugar_hallazgo` VARCHAR(25) NOT NULL COMMENT 'Nombre del Area donde se encontro el objeto',
  `etiquetas` INT NOT NULL COMMENT 'Llave foranea para las etiquetas de caracteristicas',
  `informacion_adicional` VARCHAR(100) NOT NULL COMMENT 'Datos extra sobre el objeto al entrar al inventario',
  `usuario_encontro` INT NOT NULL COMMENT 'Llave foranea al tipo de usuario que encotro el objeto',
  `usuario_recibio` INT NOT NULL COMMENT 'Llave foranea  al tipo de usuario que recibio el objeto en almacen',
  `usuario_registro_entrada` INT NOT NULL COMMENT 'Llave foranea  al tipo de usuario que registro el objeto en el sistema',
  `usuario_registro_salida` INT NOT NULL COMMENT 'Llave foranea  al tipo de usuario que registro la sealida del objeto',
  `estado` VARCHAR(25) NOT NULL COMMENT 'Informa el estado actual del objeto',
  PRIMARY KEY (`idObjetos`),
  UNIQUE INDEX `idObjetos_UNIQUE` (`idObjetos` ASC) VISIBLE)
COMMENT = 'Tabla para guardar la informacion de los objetos perdidos registrados en el sistema';

CREATE TABLE `inventario_op`.`TipoUsuario` (
  `idTipoUsuario` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada cada tipo de usuario',
  `NombreTipoUsuario` VARCHAR(25) NOT NULL COMMENT 'Nombre de tipo de Usuario',
  `DatosTipousuario` VARCHAR(50) NOT NULL COMMENT 'Campo para escribir datos para contactar al tipo de usuario',
  `Devolucio` BINARY  NOT NULL COMMENT 'Campo que nos permitira saber si a este usuario se le puede regresar el objeto que entrego',
  PRIMARY KEY (`idTipoUsuario`),
  UNIQUE INDEX `idTipoUsuario_UNIQUE` (`idTipoUsuario` ASC) VISIBLE)
COMMENT = 'Tabla para englobar los ipos de usuario';
ALTER TABLE objetos ADD FOREIGN KEY(usuario_recibio) REFERENCES TipoUsuario(idTipoUsuario);
ALTER TABLE objetos ADD FOREIGN KEY(usuario_registro_entrada) REFERENCES TipoUsuario(idTipoUsuario);
ALTER TABLE objetos ADD FOREIGN KEY(usuario_registro_salida) REFERENCES TipoUsuario(idTipoUsuario);
ALTER TABLE objetos ADD FOREIGN KEY(usuario_encontro) REFERENCES TipoUsuario(idTipoUsuario);

/*Esta es la segunda parte de las tablas*/
USE Inventario_OP;
CREATE TABLE `inventario_op`.`categorias` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a cada categoria de objetos',
  `NombreCategoria` VARCHAR(20) NOT NULL COMMENT 'Nombre de tipo de Categoria',
  `Descripcion` VARCHAR(50) NOT NULL COMMENT 'Campo para escribir una descripcion de la categoria',
  PRIMARY KEY (`idCategoria`),
  UNIQUE INDEX `idCategoria_UNIQUE` (`idCategoria` ASC) VISIBLE)
COMMENT = 'Tabla para englobar los tipos de objetos por categorias';

CREATE TABLE `inventario_op`.`subCategorias` (
  `idSubCategoria` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a cada subcategoria de objetos',
  `NombreCategoria` VARCHAR(20) NOT NULL COMMENT 'Nombre de tipo de subCategoria',
  `Descripcion` VARCHAR(50) NOT NULL COMMENT 'Campo para escribir una descripcion de la Subcategoria',
  `IdCategoria` INT NOT NULL COMMENT 'Llave foranea a la Categoria principal',
  PRIMARY KEY (`idSubCategoria`),
  FOREIGN KEY(IdCategoria) REFERENCES categorias(idCategoria),
  UNIQUE INDEX `idSubCategoria_UNIQUE` (`idSubCategoria` ASC) VISIBLE)
COMMENT = 'Tabla para englobar los tipos de objetos por Subcategorias';

CREATE TABLE `inventario_op`.`etiquetas` (
  `idEtiquta` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a cada etiqueta',
  `NombreEtiqueta` VARCHAR(20) NOT NULL COMMENT 'Nombre de la etiqueta',
  PRIMARY KEY (`idEtiquta`),
  UNIQUE INDEX `idEtiquta_UNIQUE` (`idEtiquta` ASC) VISIBLE)
COMMENT = 'Tabla para obtener las etiquetas para busqueda de objetos';

/*show create table objetos;*/

/*Correccion de llaves foraneas de la tabla objetos*/
USE Inventario_OP;
ALTER TABLE objetos DROP FOREIGN KEY objetos_ibfk_1;
ALTER TABLE objetos DROP FOREIGN KEY objetos_ibfk_2;
ALTER TABLE objetos DROP FOREIGN KEY objetos_ibfk_3;
ALTER TABLE objetos DROP FOREIGN KEY objetos_ibfk_4;

ALTER TABLE objetos ADD FOREIGN KEY(usuario_recibio) REFERENCES usuarios(idUsuarios);
ALTER TABLE objetos ADD FOREIGN KEY(usuario_registro_entrada) REFERENCES usuarios(idUsuarios);
ALTER TABLE objetos ADD FOREIGN KEY(usuario_registro_salida) REFERENCES usuarios(idUsuarios);


