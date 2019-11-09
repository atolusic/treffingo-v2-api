const User = require('db/model/User')

const { generateRandomString } = require('util/string')

async function getLastId () {
  return User.query().max('id').first()
}

async function create (data) {
  return User.query().insert(data)
}

async function generateUserData (data, n) {
  if (!n) n = (await getLastId()).max || 1

  return {
    email: `user_factory${n}@email.com`,
    password: generateRandomString(),
    fullname: `userFristname${n} userLastname${n}`,
    username: `username_factoryuser${n}`,
    bio: 'factory user bio',
    ...data,
  }
}

async function populateUser (data = {}) {
  const { max = 0 } = await getLastId()
  return create(generateUserData(max + 1, data))
}

module.exports = {
  create,
  generateUserData,
  populateUser,
}
