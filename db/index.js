const { Model, knexSnakeCaseMappers } = require('objection')
const Knex = require('knex')

const knexConfig = require('knexfile')[process.env.NODE_ENV]
const knexInstance = Knex(Object.assign(knexConfig, knexSnakeCaseMappers()))

module.exports = {
  knexInstance,
  objectionInit: () => Model.knex(knexInstance),
}
