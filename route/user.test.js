const _ = require('lodash')

const test = require('test')
const userRepo = require('repo/user')

const pw = {
  password: 'testUserPw0',
  confirmPassword: 'testUserPw0',
}

test.api('Should create new user and return token', async (t, request) => {
  const userData = {
    email: 'testuseremail@email.com',
    fullname: 'usertest1',
    ...pw,
  }

  const r = await request.post('/signup')
  .send(userData)

  t.is(r.status, 200, 'success')
  t.notOk(r.body.error, 'no error')
  t.true(r.body.data.token, 'token returned')
})

test.only.api('Should generate unique username if already exists', async (t, request) => {
  let r

  const userData = {
    email: 'testuseremail2@email.com',
    fullname: 'usertestunique',
    ...pw,
  }

  await request.post('/signup')
  .send(userData)

  r = await request.post('/signup')
  .send({ ...userData, email: 'testuseremail3@emai.com' })

  t.is(r.status, 200, 'success')
  t.notOk(r.body.error, 'no error')

  // const generatedUsername = `${userData.fullname}1`

  // r = await userRepo.getByField('username', generatedUsername)

  // t.
})
