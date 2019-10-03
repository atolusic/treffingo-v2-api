const konst = require('konst')

exports.up = function (knex) {
  return knex.schema
    .createTable('user', table => {
      table.increments('id').primary()
      table.text('email').notNullable().unique()
      table.string('username').notNullable()
      table.text('bio')
      table.string('createdAt').notNullable().defaultTo(knex.fn.now())
      table.string('profilePicture', 64)
    })
    .createTable('board', table => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.enu('visibility', Object.values(konst.boardVisibility))
      table
        .integer('team_id')
        .references('id')
        .onTable('team')
        .onDelete('NOT NULL')
    })
    .createTable('team', table => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.text('description')
    })
    .createTable('user_starred_boards', table => {
      table.increments('id').primary()
      table
        .integer('user_id')
        .references('id')
        .onTable('user')
        .onDelete('CASCADE')
      table
        .integer('board_id')
        .references('id')
        .onTable('board')
        .onDelete('CASCADE')
    })
    .createTable('user_teams', table => {
      table.increments('id').primary()
      table
        .integer('user_id')
        .references('id')
        .onTable('user')
        .onDelete('CASCADE')
      table
        .integer('team_id')
        .references('id')
        .onTable('team')
        .onDelete('CASCADE')
    })
    .createTable('user_boards', table => {
      table.increments('id').primary()
      table
        .integer('user_id')
        .references('id')
        .onTable('user')
        .onDelete('CASCADE')
      table
        .integer('board_id')
        .references('id')
        .onTable('board')
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
