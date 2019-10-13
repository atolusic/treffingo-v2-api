const bcrypt = require('bcryptjs')
const _ = require('lodash')

const error = require('error')
const { trimSpacesGlobally } = require('util/string')

const User = require('db/model/User')

async function hashPassword (password) {
  return bcrypt.hash(password, _.toInteger(process.env.BCRYPT_ROUNDS))
}

async function create ({ password, fullname, email }) {
  const user = await User.query().where('fullname', fullname).orderBy('createdAt')
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

  return User.query().insert({
    email,
    fullname,
    username: generatedUsername,
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

async function getByField (field, val) {
  return User.query().where(field, val)
  .catch(error.db)
}

module.exports = {
  create,
  getByField,
}
