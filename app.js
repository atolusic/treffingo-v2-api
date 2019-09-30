const Koa = require('koa')
// const mount = require('koa-mount')
const dbInit = require('db')

const app = new Koa()

// Initialize knex
dbInit()

module.exports = app
