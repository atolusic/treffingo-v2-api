const router = new (require('koa-router'))()
const joi = require('joi')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

const userRepo = require('repo/user')

const validate = require('middleware/validate')

router.post('/signup', validate.body({
  email: joi.string().trim().email().required(),
  fullname: joi.string().trim().max(255).required(),
  password: joi.string().trim().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
  confirmPassword: joi
    .string()
    .trim()
    .valid(joi.ref('password'))
    .required(),
}), async ctx => {
  const { email, ...body } = _.omit(ctx.v.body, 'confirmPassword')

  const { id } = await userRepo.create({
    ...body,
    email: _.toLower(email),
  })

  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

  ctx.state.r = { token }
})

module.exports = router
