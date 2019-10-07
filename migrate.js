const { knexInstance } = require('db')
const minimist = require('minimist')

async function run (command, args, opts = {}) {
  switch (command) {
    case 'clean':
      return knexInstance.raw(`
        DROP SCHEMA IF EXISTS public CASCADE;
        CREATE SCHEMA public;
      `)
    case 'up':
    case 'down': {
      return knexInstance.migrate[command]()
    }
    default:
      throw new Error('invalid db-cli command')
  }
}

async function start () {
  let argv = process.argv.slice(2)
  while (argv.length) {
    const command = argv.shift()
    const { _: args, '--': rest, ...opts } = minimist(argv, { boolean: true, '--': true })
    console.log('Running command:', command, args, opts)
    await run(command, args, opts)
    argv = rest
  }
}

start()
  .catch(err => {
    console.error(err)
  })
  .finally(() => {
    knexInstance.destroy()
  })
