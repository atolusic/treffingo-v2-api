const { Model } = require('objection')
const Knex = require('knex')

const knexConfig = require('knexfile')[process.env.NODE_ENV]
const knexInstance = Knex(knexConfig)

module.exports = {
  knexInstance,
  objectionInit: () => Model.knex(knexInstance),
}
