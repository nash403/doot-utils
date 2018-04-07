const test = require('ava')
const _ = require('../src')

const obj = {
  a: {
    b: {
      z: 12
    },
    c: {
      d: 'foo'
    }
  },
  d: {
    e: false
  }
}

_.Doot.use(Doot => {
  Doot.prototype.testPlugin = function(arg) {
    this.value = 'a new value with arg: ' + arg
    return this
  }
})

test('Test integration with dootify', t => {
  const w = _.dootify(obj)
  // Get
  t.is(w.get('a.b.z').value, 12)
  t.is(w.base().get('a.c.d').value, 'foo')
  // Set
  t.is(w.set(['f', 'g', 'h'], 2).value, 2)
  // Delete
  w.del('a.c.d')
  t.is(w.get('a.c.d').value, undefined)
  // Chaining
  t.is(
    w
      .base()
      .get('a')
      .get('b')
      .get('z').value,
    12
  )
  // Plugin
  t.is(w.testPlugin(1).value, 'a new value with arg: 1')
  const newObj = { test: 'case' }

  // Change base object
  w.base(newObj)
  t.is(w.value, newObj)
  t.is(w.chainValue, newObj)
})
