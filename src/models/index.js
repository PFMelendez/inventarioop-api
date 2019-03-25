import Sequelize from 'sequelize';
import fs from 'fs';
import dbConfig from '../config/sequelize';

const {
  database,
  username,
  password,
  host,
} = dbConfig;

const sequelize = new Sequelize(database, username, password, { host, dialect: 'mysql' });

const allFiles = fs.readdirSync(__dirname);

const modelFiles = allFiles.filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'));
