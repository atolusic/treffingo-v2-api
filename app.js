const Koa = require('koa')
// const mount = require('koa-mount')
const { objectionInit } = require('db')

const app = new Koa()

// Give the knex instance to objection.
objectionInit()

module.exports = app
