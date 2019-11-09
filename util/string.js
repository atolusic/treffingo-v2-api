const crs = require('crypto-random-string')

function trimSpacesGlobally (str) {
  return str.replace(/\s/g, '')
}

function generateRandomString (opts = { length: 60 }) {
  return crs(opts)
}

module.exports = {
  trimSpacesGlobally,
  generateRandomString,
}
