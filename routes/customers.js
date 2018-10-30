const errors = require('restify-errors')
const Customer = require('../models/Customer')

module.exports = server => {
    // Get Customers
  server.get('/customers', async (request, response, next) => {
    try {
      const customers = await Customer.find({})
      response.send({
        customers,
        message: 'Found customers',
        response: 'Success'
      })
      next()
    } catch (error) {
      return next(new errors.InvalidContentError(error))
    }
  })

    // Get single customer
  server.get('/customers/:id', async (request, response, next) => {
    try {
      const customerID = request.params.id
      const customer = await Customer.findById(customerID)
      response.send({
        customer,
        message: 'Found customer',
        response: 'Success'
      })
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the ID: ${customerID}`))
    }
  })

    // Create Customer
  server.post('/customers', async (request, response, next) => {
        // Check for JSON
    if (!request.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"))
    }

        // Take given details and create new Customer from Model
    const { name, email, balance } = request.body
    const customer = new Customer({
      name,
      email,
      balance
    })

    try {
      const newCustomer = await customer.save()
      response.send(201)
      next()
    } catch (error) {
      return next(new errors.InternalServerError(error))
    }
  })

  server.put('/customers/:id', async (request, response, next) => {
        // Check for JSON
    if (!request.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"))
    }

    try {
      const customer = await Customer.findOneAndUpdate({ _id: request.params.id }, request.body)
      response.send(200)
      next()
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the ID: ${request.params.id}`))
    }
  })

    // Delete customer
  server.del('/customers/:id', async (request, response, next) => {
    try {
      const customer = await Customer.findOneAndRemove({ _id: request.params.id })
      response.send(204)
      next()
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the ID: ${request.params.id}`))
    }
  })
}
