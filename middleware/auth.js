const jwt = require('jsonwebtoken')
const _ = require('lodash')

const error = require('error')

function auth () {
  return (ctx, next) => {
    const authorization = ctx.get('Authorization') || ''
    const [type, token] = _.split(authorization, ' ')

    if (!authorization || type !== 'Bearer' || !token) {
      throw error('http.bad_request', 'Authorization header is required.')
    }

    try {
      ctx.state.user = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
      throw error('http.unauthorized', e)
    }

    return next()
  }
}

module.exports = {
  auth: auth(),
}
