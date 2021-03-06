const konst = require('konst')

exports.up = function (knex) {
  return knex.schema
  .createTable('user', table => {
    table.increments('id').primary()
    table.text('email').notNullable().unique()
    table.string('password', 60).notNullable()
    table.string('fullname').notNullable()
    table.string('username').notNullable()
    table.text('bio')
    table.string('created_at').notNullable().defaultTo(knex.fn.now())
    table.string('profile_picture', 64)
  })
  .createTable('team', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('created_at').notNullable().defaultTo(knex.fn.now())
    table.text('description')
  })
  .createTable('board', table => {
    table.increments('id').primary()
    table.string('created_at').notNullable().defaultTo(knex.fn.now())
    table.string('title').notNullable()
    table
    .enu('visibility', Object.values(konst.boardVisibility))
    .defaultTo(konst.boardVisibility.public)
    .notNullable()
    table
    .integer('team_id')
    .references('id')
    .inTable('team')
    .onDelete('SET NULL')
  })
  .createTable('user_starred_boards', table => {
    table.increments('id').primary()
    table
    .integer('user_id')
    .references('id')
    .inTable('user')
    .onDelete('CASCADE')
    table
    .integer('board_id')
    .references('id')
    .inTable('board')
    .onDelete('CASCADE')
  })
  .createTable('user_teams', table => {
    table.increments('id').primary()
    table
    .integer('user_id')
    .references('id')
    .inTable('user')
    .onDelete('CASCADE')
    table
    .integer('team_id')
    .references('id')
    .inTable('team')
    .onDelete('CASCADE')
  })
  .createTable('user_boards', table => {
    table.increments('id').primary()
    table
    .integer('user_id')
    .references('id')
    .inTable('user')
    .onDelete('CASCADE')
    table
    .integer('board_id')
    .references('id')
    .inTable('board')
    .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema
  .dropTableIfExists('user')
  .dropTableIfExists('board')
  .dropTableIfExists('team')
  .dropTableIfExists('user_starred_boards')
  .dropTableIfExists('user_teams')
  .dropTableIfExists('user_boards')
}
