const test = require('ava')
const _ = require('../src/lib/core/set')

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

function check(t, path, from, to) {
  const wobj = Object.assign({}, obj)
  const initial = path.reduce((o, k) => o[k], wobj)
  t.is(from, initial, `initial value of obj${path.join('.')} should be ${initial}, got ${initial}`)
  const out = _(wobj, path, to)
  const expected = path.reduce((o, k) => o[k], wobj)
  t.is(out, expected, `set(obj, "${path.join('.')}", ${to}) should be ${expected}, got ${out}`)
}

test('Test method: set', t => {
  check(t, ['a', 'b', 'z'], 12, 2)
  check(t, ['a', 'b', 'nale'], undefined, true)
  check(t, ['d', 'e'], false, true)
  t.is(_(obj, 'a.v.c', 'lol'), obj.a.v.c)
})
