const get = require('./lib/core/get')
const set = require('./lib/core/set')
const del = require('./lib/core/del')
const toPath = require('./lib/helpers/to-path')

class Doot {
  constructor(obj) {
    this.objectRef = obj
    this.value = obj
    this.chainValue = obj
  }

  base(obj) {
    this.value = obj || this.objectRef
    this.chainValue = obj || this.objectRef
    return this
  }

  static use(fn) {
    fn(Doot)
  }

  get(key, ...args) {
    const res = get(this.chainValue, key, ...args)
    this.value = res
    this.chainValue = res
    return this
  }

  set(key, val) {
    this.value = set(this.chainValue, key, val)
    return this
  }

  del(key) {
    this.value = del(this.chainValue, key)
    return this
  }
}

module.exports = {
  toPath,
  get,
  set,
  del,
  Doot,
  dootify: obj => new Doot(obj)
}
