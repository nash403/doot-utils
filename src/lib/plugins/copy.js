const get = require('../core/get')
const set = require('../core/set')
const del = require('../core/del')

module.exports = function(obj, key, target, targetKey, mod = val => val, mv = false) {
  if (typeof targetKey === 'string' || Array.isArray(targetKey)) {
    if (typeof mod === 'boolean') {
      mv = mod
      mod = val => val
    }
  } else {
    if (typeof targetKey === 'function') {
      mv = typeof mod === 'boolean' ? mod : mv
      mod = targetKey
    }
    if (typeof targetKey === 'boolean') {
      mv = targetKey
    }
    targetKey = key
  }
  const v = get(obj, key)
  const copiedValue = typeof v === 'undefined' ? undefined : set(target, targetKey, mod ? mod(v, key, targetKey) : v)
  if (copiedValue !== undefined && mv) del(obj, key)
  return copiedValue
}
