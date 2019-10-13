const error = require('error')
const { QueryBuilder } = require('objection')

class ExtendedQueryBuilder extends QueryBuilder {
  startsWith (fieldName, like, orderBy = 'createdAt') {
    return this.where(fieldName, 'like', `${like}%`).orderBy(orderBy)
    .catch(error.db)
  }
}

function findOneResolver (errorMsg) {
  return (r) => {
    if (!r) throw error(errorMsg)

    return r
  }
}

module.exports = {
  ExtendedQueryBuilder,
  findOneResolver,
}
