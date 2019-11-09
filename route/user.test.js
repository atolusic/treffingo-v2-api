const test = require('test')

test.api('It should create new user and return token', async (t, request) => {
  const userData = {
    email: 'testuseremail@email.com',
    password: 'testUserPw1',
    confirmPassword: 'testUserPw1',
    fullname: 'usertest1',
  }

  const r = await request.post('/signup')
  .send(userData)

  t.is(r.status, 200, 'success')
  t.notOk(r.body.error, 'no error')
  t.true(r.body.data.token, 'token returned')
})
