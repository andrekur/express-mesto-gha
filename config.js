
const {
  PORT = 3000,
  SECRET_KEY = 'dev-secret-key',
  DB_NAME = 'mestodb',
  DB_HOST = '127.0.0.1',
  DB_PORT = '27017'
} = process.env;

module.exports.config = {
  PORT, SECRET_KEY, DB_NAME, DB_HOST, DB_PORT
}
