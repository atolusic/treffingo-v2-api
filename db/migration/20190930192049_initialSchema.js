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
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('user')
}
