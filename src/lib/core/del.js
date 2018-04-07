const toPath = require('../helpers/to-path')

module.exports = function(obj, key, p) {
  p = 0
  const path = toPath(key)
  const z = path[path.length - 1]
  while (Object.prototype.hasOwnProperty.call(obj, path[p]) && path[p] !== z) obj = obj[path[p++]]
  if (obj && path[p] === z && Object.prototype.hasOwnProperty.call(obj, z)) {
    delete obj[z]
    return true
  }
  return false
}
