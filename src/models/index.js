import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from '../config';

const {
  database,
  username,
  password,
  host,
} = config;

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(database, username, password, { host, dialect: 'mysql', port: 3306 });

const allFiles = fs.readdirSync(__dirname);

const modelFiles = allFiles.filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'));

modelFiles.forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

console.log(db);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize.drop();
sequelize.sync();
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.Usuario.create({ nombre: 'foo', apellidos: 'bar', correo: 'a', nombre_usuario: 'b', contrasena: 'c' });

// db.Objetos.create({
//   nombre: 'Charlie',
//   usuario_registro_entrada: 1,

//   etiquetas: [
//     { nombre_etiqueta: 'Alpha'},
//     { nombre_etiqueta: 'Beta'}
//   ]
// }, {
//   include: [{
//     model: db.Etiqueta,
//     as: 'etiquetas'
//   }]
// })

// db.Objetos.findAll({
//   include: [{
//     model: db.Etiqueta,
//     as: 'etiquetas'
//   }]
// }).then(result => {
//   console.log(result[0].etiquetas)
// });

// db.TipoUsuario.create({ nombre: 'admin', display: 'Administrador' });
// db.TipoUsuario.create({ nombre: 'capture', display: 'Capturista' });

// db.Estado.create({ descripcion: 'Bueno' });
// db.Estado.create({ descripcion: 'Regular' });
// db.Estado.create({ descripcion: 'Malo' });


export default db;
