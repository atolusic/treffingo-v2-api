const bcrypt = require('bcryptjs')
const _ = require('lodash')

const error = require('error')
const { findOneResolver } = require('db/util')

const User = require('db/model/User')
const knex = User.knex()

async function hashPassword (password) {
  return bcrypt.hash(password, _.toInteger(process.env.BCRYPT_ROUNDS))
}

async function create (trx = knex) {
  return async ({ password, ...data }) => {
    return User.query(trx).insert({
      data,
      password: await hashPassword(password),
    })
    .catch(err => {
      switch (err.constraint) {
        case 'user_email_unique':
          throw error('user.duplicate', err)
        default:
          throw error.db(err)
      }
    })
  }
}

async function getById (id) {
  return User.query().findOne({ id })
  .catch(error.db)
  .then(findOneResolver('user.not_found'))
}

async function getByUsername (username) {
  return User.query().findOne({ username })
  .catch(error.db)
  .then(findOneResolver('user.not_found'))
}

module.exports = {
  create: create(),
  getById,
  getByUsername,
  trx: trx => ({
    create: create(trx),
  }),
}
