import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from '../config';
import services from '../services';

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
sequelize.sync().then(() => {
  db.Categorias.create({ descripcion: 'Electronicos', estante: 'A' }).then((categoria) => {
    services.subcategorias.create({ descripcion: 'Celulares', categoria: categoria.id });
    services.subcategorias.create({ descripcion: 'Computadoras', categoria: categoria.id });
  });

  db.Categorias.create({ descripcion: 'Equipo', estante: 'B' }).then((categoria) => {
    services.subcategorias.create({ descripcion: 'Deportivo', categoria: categoria.id });
    services.subcategorias.create({ descripcion: 'Musical', categoria: categoria.id });
  });

  db.Categorias.create({ descripcion: 'Personales', estante: 'C' }).then((categoria) => {
    services.subcategorias.create({ descripcion: 'Carteras', categoria: categoria.id });
    services.subcategorias.create({ descripcion: 'Tarjetas', categoria: categoria.id });
  });

  db.TiposUsuarios.create({ nombre: 'admin', display: 'Administrador' });
  db.TiposUsuarios.create({ nombre: 'capture', display: 'Capturista' });

  db.Estados.create({ descripcion: 'Bueno' });
  db.Estados.create({ descripcion: 'Regular' });
  db.Estados.create({ descripcion: 'Malo' });

  db.Etiquetas.create({ nombreEtiqueta: 'Star Wars' });
  db.Etiquetas.create({ nombreEtiqueta: 'Android' });
  db.Etiquetas.create({ nombreEtiqueta: 'Harry Potter' });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;
