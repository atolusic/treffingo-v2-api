const { Model } = require('objection')

const Team = require('db/model/Team')
const Board = require('db/model/Board')

class User extends Model {
  static tableName = 'user'

  static jsonSchema = {
    type: 'object',
    required: ['email', 'fullname', 'username', 'password'],
    properties: {
      id: { type: 'integer' },
      fullname: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      username: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      password: {
        type: 'string',
        minLength: 64,
        maxLength: 64,
      },
      bio: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      createdAt: {
        type: 'string',
        format: 'date',
      },
      profilePicture: {
        type: 'string',
        minLength: 64,
        maxLength: 64,
      },
    },
  }

  static relationMappings = {
    teams: {
      relation: Model.ManyToManyRelation,
      modelClass: Team,
      join: {
        from: 'user.id',
        through: {
          from: 'userTeams.userId',
          to: 'userTeams.teamId',
        },
        to: 'team.id',
      },
    },

    boards: {
      relation: Model.ManyToManyRelation,
      modelClass: Board,
      join: {
        from: 'user.id',
        through: {
          from: 'userBoards.userId',
          to: 'userBoards.boardId',
        },
        to: 'board.id',
      },
    },

    starredBoards: {
      relation: Model.ManyToManyRelation,
      modelClass: Board,
      join: {
        from: 'user.id',
        through: {
          from: 'starredBoards.userId',
          to: 'starredBoards.boardId',
        },
        to: 'board.id',
      },
    },
  }
}

export default User
