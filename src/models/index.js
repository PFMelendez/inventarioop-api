import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import dbConfig from '../config/sequelize';

const {
  database,
  username,
  password,
  host,
} = dbConfig;

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(database, username, password, { host, dialect: 'mysql' });

const allFiles = fs.readdirSync(__dirname);

const modelFiles = allFiles.filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'));

modelFiles.forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
