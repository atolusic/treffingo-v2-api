const app = new (require('koa'))()
const mount = require('koa-mount')
const { objectionInit } = require('db')

// Give the knex instance to objection.
objectionInit()

app.proxy = true
app.use(require('koa-response-time')())
app.use(require('koa-conditional-get')())
app.use(require('koa-etag')())
app.use(require('koa-helmet')())
app.use(require('kcors')())
app.use(require('koa-bodyparser')())

app.use(mount('/', require('route/user').routes()))

module.exports = app
