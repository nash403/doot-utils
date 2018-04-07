const test = require('ava')
const _ = require('../src/lib/core/del')

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

test('Test method: del', t => {
  t.false(_(obj, 'a.v.c'))
  t.is(obj.a.b.z, 12)
  t.true(_(obj, 'a.b.z'))
  t.is(obj.a.b.z, undefined)
  t.false(_(obj, 'a.b.z'))
  t.true(_(obj, 'a.b'))
  t.is(obj.a.b, undefined)
  t.false(_(obj, 'f.g.h'))
})
