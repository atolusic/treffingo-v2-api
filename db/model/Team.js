const { Model } = require('objection')

const User = require('db/model/User')

class Team extends Model {
  static tableName = 'team'

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      createdAt: {
        type: 'string',
        format: 'date',
      },
    },
  }

  static relationMappings = {
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'team.id',
        through: {
          from: 'userTeams.teamId',
          to: 'userTeams.userId',
        },
        to: 'user.id',
      },
    },
  }
}

module.exports = Team
