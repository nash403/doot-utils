const copy = require('./copy')

// eslint-disable-next-line no-unused-vars
module.exports = function(obj, key, target, targetKey, mod = val => val) {
  return copy(obj, key, target, targetKey, mod, true)
}
