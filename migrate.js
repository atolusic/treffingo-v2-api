const { knexInstance } = require('db')

knexInstance
  .migrate
  .latest({})
  .catch(err => {
    console.error(err)
  })
  .finally(() => {
    knexInstance.destroy()
  })
