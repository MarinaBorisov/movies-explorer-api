require('dotenv').config();

const { PORT = 3000 } = process.env;
const { DB_CONNECT = 'mongodb://localhost:27017/moviesdb' } = process.env;
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = {
  PORT,
  DB_CONNECT,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key',
};
