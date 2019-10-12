const bcrypt = require('bcryptjs')
const _ = require('lodash')

const error = require('error')

const User = require('db/model/User')

async function hashPassword (password) {
  return bcrypt.hash(password, _.toInteger(process.env.BCRYPT_ROUNDS))
}

async function create ({ password, fullname, email }) {
  return User.query().insert({
    email,
    fullname,
    username: fullname.replace(/\s/g, ''),
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

// async function getByUsername ({ username }) {
//   return User.query().where('username')
// }

module.exports = {
  create,
}
