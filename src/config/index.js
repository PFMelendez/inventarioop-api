export default {
  port: process.env.PORT || 3005,
  bodyLimit: process.env.API_BODY_LIMIT || '100kb',
  API_URL: process.env.API_URL || 'http://localhost',
  API_PORT: process.env.PORT || 3005,
  database: process.env.DB_DATABASE || 'inventarios',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
}
