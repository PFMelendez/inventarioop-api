export default {
  port: process.env.PORT || 3005,
  bodyLimit: process.env.API_BODY_LIMIT || '100kb',
  API_URL: process.env.API_URL || 'http://localhost',
  API_PORT: process.env.PORT || 3005
}