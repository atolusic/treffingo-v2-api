const jwt = require('jsonwebtoken')
const _ = require('lodash')

function auth () {
  return (ctx, next) => {
    const token = _.last(ctx.header.authorization.split(' '))

    ctx.state.user = jwt.verify(token, process.env.JWT_SECRET)

    return next()
  }
}

module.exports = {
  auth: auth(),
}
