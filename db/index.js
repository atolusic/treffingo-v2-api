const { Model } = require('objection')
const Knex = require('knex')

const knexConfig = require('knexfile')[process.env.NODE_ENV]

module.exports = () => Model.knex(Knex(knexConfig))
