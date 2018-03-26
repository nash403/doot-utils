const toPath = require('../helpers/to-path')

/* eslint-disable no-return-assign */
module.exports = function(object, key, val) {
  const path = toPath(key)
  return object
    ? (path.slice(0, -1).reduce((obj, p) => {
        return (obj[p] = obj[p] || {})
      }, object)[path.pop()] = val)
    : undefined
}
