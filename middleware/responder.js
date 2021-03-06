const isPromise = require('is-promise')

async function responder (ctx, next) {
  await next()

  if (ctx.respond !== false) {
    ctx.assert(ctx.state.r, 500, 'using responder but did not set the response object on ctx.state.r')
    ctx.assert(!isPromise(ctx.state.r), 500, 'r is a promise, you probably forgot await')
    ctx.body = {
      code: 200,
      data: ctx.state.r,
    }
  }
}

module.exports = responder
