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

_.Doot.use(Dotify => {
  Dotify.prototype.testPlugin = function(arg) {
    this.value = 'a new value with arg: ' + arg
    return this
  }
})

test('Dotify', t => {
  const w = _.dootify(obj)
  t.is(w.get('a.b.z').value, 12)
  t.is(w.root().get('a.c.d').value, 'foo')
  w.del('a.c.d')
  t.is(w.get('a.c.d').value, undefined)
  t.is(
    w
      .root()
      .get('a')
      .get('b')
      .get('z').value,
    12
  )
  t.is(w.testPlugin(1).value, 'a new value with arg: 1')
})
