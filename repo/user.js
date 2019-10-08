const bcrypt = require('bcryptjs')
const _ = require('lodash')

const error = require('error')

const User = require('db/model/User')

async function hashPassword (password) {
  return bcrypt.hash(password, _.toInteger(process.env.BCRYPT_ROUNDS))
    .catch(error.db('user.password_invalid'))
}

async function create ({ password, fullname, email }) {
  return User.query().insert({
    email,
    fullname,
    username: fullname.replace(/\s/g, ''),
    password: await hashPassword(password),
  })
}

module.exports = {
  create,
}
