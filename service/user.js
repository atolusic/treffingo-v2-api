const { transaction } = require('objection')
const _ = require('lodash')

const { trimSpacesGlobally } = require('util/string')

const userRepo = require('repo/user')
const User = require('db/model/User')
const knex = User.knex()

async function signunp ({ fullname, ...data }) {
  return transaction(knex, async (trx) => {
    const generateUsername = generateUsernameFromFullname(trx)

    return userRepo.trx(trx).create({
      username: await generateUsername(fullname),
      fullname,
      ...data,
    })
  })
}

function generateUsernameFromFullname (trx = knex) {
  return async fullname => {
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
}

module.exports = {
  generateUsernameFromFullname,
  signunp,
}
