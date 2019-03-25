require('dotenv').config();
const Sequelize = require('sequelize');

try {
  const
    database = process.env.DB_DATABASE,
    username = process.env.DB_USER,
    password = process.env.DB_PASSWORD,
    host = process.env.DB_HOST;

  const db = {};

  const sequelize = new Sequelize(database, username, password, { host, dialect: 'mysql' });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  console.log('Conexión exitosa');
} catch (err) {
  console.log('Error al conectar con la base de datos');
  console.error(err);
}
