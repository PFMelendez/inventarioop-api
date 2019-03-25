export default {
  database: process.env.DB_DATABASE || 'inventarioop',
  username: process.env.DB_USER || 'root',
  pasword: process.env.DB_PASSWORD || 'mysql',
  host: process.env.DB_HOST || 'localhost',
}