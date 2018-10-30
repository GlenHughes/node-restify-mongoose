const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./config')

const server = restify.createServer()
console.log(config)
// - Middleware
server.use(restify.plugins.bodyParser())

server.listen(config.PORT, () => {
  console.log('connected to restify')
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
})

const db = mongoose.connection

db.on('error', error => console.log(error))

db.once('open', () => {
  require('./routes/customers')(server)
  console.log(`Server started on port ${config.PORT}`)
})