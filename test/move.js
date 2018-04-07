const test = require('ava')
const _ = require('../src/lib/plugins/move')

/* eslint-disable no-unused-expressions */
let obj = {
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

test.beforeEach(() => {
  obj = {
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
})

test('Test move a simple key to another', t => {
  const tgt = {}
  t.is(tgt.lol, undefined)
  t.is(_(obj, 'a.b.z', tgt, 'lol'), tgt.lol)
  t.is(obj.a.b.z, undefined)
})

test('Test move a key that does not exist in source', t => {
  const tgt = {}
  t.is(tgt.key, undefined)
  t.is(_(obj, 'a.inexistant.z', tgt, 'key.subkey'), undefined)
  t.is(tgt.key, undefined)
})

test('Test move a key with modifier function', t => {
  const tgt = {}
  t.is(tgt.lol, undefined)
  const before = obj.a.b.z
  const after = _(obj, 'a.b.z', tgt, 'lol', v => v + 1)
  t.is(before + 1, after)
  t.is(tgt.lol, after)
  t.is(obj.a.b.z, undefined)
})

test('Test move with ommited parameters (all parameters skipped)', t => {
  const tgt = {}
  t.throws(() => tgt.a.b.z)
  const after = _(obj, 'a.b.z', tgt)
  t.is(after, tgt.a.b.z)
  t.is(obj.a.b.z, undefined)
  t.not(obj.a.b.z, after)
})

test('Test move with ommited parameters (targetKey parameter is skipped)', t => {
  const tgt = {}
  const before = obj.a.b.z
  const after = _(obj, 'a.b.z', tgt, v => v + 1)
  t.is(before + 1, tgt.a.b.z)
  t.is(tgt.a.b.z, after)
  t.is(obj.a.b.z, undefined)
  t.not(obj.a.b.z, after)
})

test('Test move with ommited parameters (targetKey & mod parameters are skipped)', t => {
  const tgt = {}
  const after = _(obj, 'a.b.z', tgt, true)
  t.is(after, tgt.a.b.z)
  t.is(obj.a.b.z, undefined)
  t.not(obj.a.b.z, after)
})

test('Test move with ommited parameters (only mod parameter is skipped)', t => {
  const tgt = {}
  const after = _(obj, 'a.b.z', tgt, 'lol', true)
  t.is(tgt.lol, after)
  t.is(obj.a.b.z, undefined)
  t.not(obj.a.b.z, after)
})
