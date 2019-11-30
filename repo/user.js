const bcrypt = require('bcryptjs')
const _ = require('lodash')

const error = require('error')
const { findOneResolver } = require('db/util')

const User = require('db/model/User')
const knex = User.knex()

async function hashPassword (password) {
  return bcrypt.hash(password, _.toInteger(process.env.BCRYPT_ROUNDS))
}

function create (trx = knex) {
  return async ({ password, ...data }) => {
    return User.query(trx).insert({
      ...data,
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

function getById (trx = knex) {
  return async id => {
    return User.query(trx).findOne({ id })
    .catch(error.db)
    .then(findOneResolver('user.not_found'))
  }
}

function getByEmail (trx = knex) {
  return async email => {
    return User.query(trx).findOne({ email })
    .catch(error.db)
    .then(findOneResolver('user.not_found'))
  }
}

function getByUsername (trx = knex) {
  return async username => {
    return User.query(trx).findOne({ username })
    .catch(error.db)
    .then(findOneResolver('user.not_found'))
  }
}

function getByFullname (trx = knex) {
  return async fullname => {
    return User.query(trx)
    .where('fullname', fullname).orderBy('createdAt')
    .catch(error.db)
  }
}

module.exports = {
  create: create(),
  getById: getById(),
  getByFullname: getByFullname(),
  getByUsername: getByUsername(),
  getByEmail: getByEmail(),
  trx: trx => ({
    create: create(trx),
    getById: getById(trx),
    getByEmail: getByEmail(trx),
    getByFullname: getByFullname(trx),
    getByUsername: getByUsername(trx),
  }),
}
