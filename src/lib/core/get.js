const toPath = require('../helpers/to-path')

module.exports = function(obj, key, ...args) {
  let i = 0
  const path = toPath(key)
  while (obj && i < path.length - 1) obj = obj[path[i++]]
  return obj === undefined
    ? args[args.length - 1]
    : path[i].slice(-2) === '()' ? obj[path[i].slice(0, -2)](...args) : obj === null ? null : obj[path[i]]
}
