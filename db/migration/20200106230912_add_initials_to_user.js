exports.up = function (knex) {
  return knex.schema.table('user', table => {
    table.string('initials', 4).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.table('user', table => {
    table.dropColumn('initials')
  })
}
