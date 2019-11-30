const router = new (require('koa-router'))()
const joi = require('joi')
const _ = require('lodash')

const userService = require('service/user')

const validate = require('middleware/validate')
const responder = require('middleware/responder')
// const { auth } = require('middleware/auth')

router.use(responder)

router.post('/signup', validate.body({
  email: joi.string().trim().email().required(),
  fullname: joi.string().trim().max(255).required(),
  password: joi.string().trim().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
  confirmPassword: joi.string().trim().valid(joi.ref('password')).options({
    language: {
      any: {
        allowOnly: '!!Passwords do not match',
      },
    },
  }).required(),
}), async ctx => {
  const { email, ...body } = _.omit(ctx.v.body, 'confirmPassword')

  ctx.state.r = await userService.signunp({ ...body, email: _.toLower(email) })
})

router.post('/signin', validate.body({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
}), async ctx => {
  const { email, password } = ctx.v.body

  ctx.state.r = await userService.signin({ email, password })
})

// router.get('/user/:username', auth, validate.param({
//   username: joi.string().trim().max(255).required(),
// }), async ctx => {
//   const { username } = ctx.v.param

//   ctx.state.r = await userRepo.getByField('username', username)
// })

module.exports = router
