import { Model } from 'objection'

class User extends Model {
  static tableName = 'user'
}

module.exports = User
