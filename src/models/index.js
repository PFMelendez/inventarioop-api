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

// db.Categoria.create({ descripcion: 'Cat1', estante: 'Est1' });
// db.Subcategoria.create({ descripcion: 'Subcat1', categorium_id_categoria: 1 });
// db.Subcategoria.create({ descripcion: 'Subcat2', categorium_id_categoria: 1 });

// db.TipoUsuario.create({ nombre: 'admin', display: 'Administrador' });
// db.TipoUsuario.create({ nombre: 'capture', display: 'Capturista' });

// db.Estado.create({ descripcion: 'Bueno' });
// db.Estado.create({ descripcion: 'Regular' });
// db.Estado.create({ descripcion: 'Malo' });


export default db;
