const { Model } = require('objection')

const User = require('db/model/User')
const konst = require('konst')

class Team extends Model {
  static tableName = 'board'

  static jsonSchema = {
    type: 'object',
    required: ['title', 'visibility'],
    properties: {
      id: { type: 'integer' },
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      visibility: {
        type: 'string',
        enum: Object.values(konst.boardVisibility),
      },
      createdAt: {
        type: 'string',
        format: 'date',
      },
    },
  }

  static relationMappings = {
    boards: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'board.id',
        through: {
          from: 'userBoards.boardI',
          to: 'userBoards.userId',
        },
        to: 'user.id',
      },
    },

    starredBoards: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'board.id',
        through: {
          from: 'starredBoards.boardId',
          to: 'starredBoards.userId',
        },
        to: 'user.id',
      },
    },
  }
}

export default Team
