const test = require('ava')
const _ = require('../src/lib/plugins/copy')

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

test('Test copy a simple key to another', t => {
  const tgt = {}
  t.is(tgt.lol, undefined)
  t.is(_(obj, 'a.b.z', tgt, 'lol'), tgt.lol)
})

test('Test copy a key that does not exist in source', t => {
  const tgt = {}
  t.is(tgt.key, undefined)
  t.is(_(obj, 'a.inexistant.z', tgt, 'key.subkey'), undefined)
  t.throws(() => {
    // eslint-disable-next-line no-unused-expressions
    tgt.key.subkey
  })
})

test('Test copy a key with modifier function', t => {
  const tgt = {}
  t.is(tgt.lol, undefined)
  const before = obj.a.b.z
  const after = _(obj, 'a.b.z', tgt, 'lol', v => v + 1)
  t.is(before + 1, after)
  t.is(tgt.lol, after)
})

test('Test copy with ommited parameters (all parameters skipped)', t => {
  const tgt = {}
  t.throws(() => tgt.a.b.z)
  t.is(_(obj, 'a.b.z', tgt), tgt.a.b.z)
  t.is(obj.a.b.z, tgt.a.b.z)
})

test('Test copy with ommited parameters (targetKey parameter is skipped)', t => {
  const tgt = {}
  const before = obj.a.b.z
  const after = _(obj, 'a.b.z', tgt, v => v + 1)
  t.is(before + 1, tgt.a.b.z)
  t.is(tgt.a.b.z, after)
})

test('Test copy with ommited parameters (targetKey & mod parameters are skipped)', t => {
  const tgt = {}
  const after = _(obj, 'a.b.z', tgt, false)
  t.is(obj.a.b.z, tgt.a.b.z)
  t.is(tgt.a.b.z, after)
})

test('Test copy with ommited parameters (only mod parameter is skipped)', t => {
  const tgt = {}
  const after = _(obj, 'a.b.z', tgt, 'lol', false)
  t.is(obj.a.b.z, tgt.lol)
  t.is(tgt.lol, after)
})
