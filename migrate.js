const { knexInstance } = require('db')

async function run (command, args, opts = {}) {
  switch (command) {
    case 'clean':
      return knexInstance.raw(`
        DROP SCHEMA IF EXISTS public CASCADE;
        CREATE SCHEMA public;
      `)
    case 'up':
    case 'down': {
      return knexInstance[command]()
    }
    default:
      throw new Error('invalid db-cli command')
  }
}

async function start () {
  const argv = process.argv.slice(2)
  while (argv.length) {
    const command = argv.shift()
  }
}

start()

// knexInstance
//   .migrate
//   .latest()
//   .catch(err => {
//     console.error(err)
//   })
//   .finally(() => {
//     knexInstance.destroy()
//   })
