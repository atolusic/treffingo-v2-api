import Koa from 'koa'
import mount from 'koa-mount'
import knex from 'db'

const app = new Koa()

// Initialize knex
knex()

export default app
