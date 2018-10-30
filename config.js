require('dotenv').config()

module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT,
  URL: `${process.env.URL}:${process.env.PORT}`,
  MONGODB_URI: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONG_DB_NAME}`
}
