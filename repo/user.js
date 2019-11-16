const bcrypt = require('bcryptjs')
const _ = require('lodash')
const { transaction } = require('objection')

const error = require('error')
const { trimSpacesGlobally } = require('util/string')
const { findOneResolver } = require('db/util')

const User = require('db/model/User')
const knex = User.knex()

async function hashPassword (password) {
  return bcrypt.hash(password, _.toInteger(process.env.BCRYPT_ROUNDS))
}

async function generateUsernameFromFullname (fullname, trx = knex) {
  const user = await User.query(trx).where('fullname', fullname).orderBy('createdAt')
  const len = user.length

  let generatedUsername

  if (len === 1) {
    generatedUsername = `${trimSpacesGlobally(fullname)}1`
  } else if (len > 1) {
    const { username } = _.last(user)
    const lastChar = _.last(_.split(username, ''))

    generatedUsername = `${trimSpacesGlobally(fullname)}${_.toNumber(lastChar) + 1}`
  } else {
    generatedUsername = trimSpacesGlobally(fullname)
  }

  return generatedUsername
}

async function create ({ password, fullname, email }) {
  return transaction(knex, async trx => {
    const username = await generateUsernameFromFullname(fullname, trx)
    const user = await User.query(trx).insert({
      email,
      fullname,
      username,
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

    return user
  })
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
  create,
  getById,
  getByUsername,
}
