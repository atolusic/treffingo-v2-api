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

test.api('Should generate unique username if already exists', async (t, request) => {
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

  const generatedUsername = `${userData.fullname}1`

  r = await userRepo.getByUsername(generatedUsername)

  t.same(r.username, generatedUsername, 'generate unique username success')
})

test.api('Should throw unique email error', async (t, request) => {
  const userData = {
    email: 'testuseremail3@email.com',
    fullname: 'usertestunique',
    ...pw,
  }

  await request.post('/signup')
  .send(userData)

  const r = await request.post('/signup')
  .send(userData)

  t.is(r.status, 400, 'error')
  t.ok(r.body.error, 'error info')
  t.is(r.body.error, 'user.duplicate', 'email already exists')
})

test.api('/singin should return token', async (t, request) => {
  const userData = {
    email: 'testuseremail4@email.com',
    fullname: 'usertestunique1',
    ...pw,
  }

  await request.post('/signup')
  .send(userData)

  const r = await request.post('/signin')
  .send(_.omit(userData, ['confirmPassword', 'fullname']))

  t.is(r.status, 200, 'success')
  t.notOk(r.body.error, 'no error')
  t.ok(r.body.data.token, 'token returned')
})
