const errors = require('restify-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../auth')
const config = require('../config')

module.exports = server => {
    // - Register user
  server.post('/register', (request, response, next) => {
    const { email, password } = request.body

    const user = new User({
      email,
      password
    })

    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(user.password, salt, async (error, hash) => {
                // Hash password
        user.password = hash
                // Save user
        try {
          const newUser = await user.save()
          response.send(201)
          next()
        } catch (error) {
          return next(new errors.InternalError(error))
        }
      })
    })
  })

  server.post('/auth', async (request, response, next) => {
    const { email, password } = request.body

    try {
            // - Authenticate user
      const user = await auth.authenticate(email, password)

            // - Create JWT
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '1hr'
      })

      const { iat, exp } = jwt.decode(token)

      response.send({
        iat,
        exp,
        token
      })

      next()
    } catch (error) {
      return next(new errors.UnauthorizedError(error))
    }
  })
}
