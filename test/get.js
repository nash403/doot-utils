const test = require('ava')
const _ = require('../src/lib/core/get')

test('Test method: get', t => {
  const obj = {
    a: {
      b: {
        'prop.withdot': { c: 'john cena' },
        prop: { g: 'r2d2' },
        h: 'hanouka'
      },
      i: 7,
      e: [
        {
          f: 'legendary',
          fn() {
            return 'a value'
          },
          fn2(arg) {
            return arg + 1
          },
          fn3(arg1, arg2) {
            return `${arg1} - ${arg2}`
          }
        }
      ]
    },
    d: [127, 666]
  }
  t.is(_(obj, 'd.1'), 666)
  t.is(_(obj, 'a.e[0].f'), 'legendary')
  t.is(_(obj, 'a.b["prop.withdot"].c'), 'john cena')
  t.is(_(obj, ['a', 'b', 'prop', 'g']), 'r2d2')

  t.is(_(obj, 'a.inexistant.prop.b'), undefined)
  t.is(_(obj, 'a.i.undefined'), undefined)
  t.is(_(undefined, 'a.inexistant.prop.b'), undefined)
  t.is(_(obj, 'a.inexistant.prop.with.default.b', 3), 3)

  t.is(_(obj, 'a.e[0].fn()'), 'a value')
  t.is(_(obj, 'a.e[0].fn2()', 2), 3)
  t.is(_(obj, 'a.e[0].fn3()', 'John', 'Doe'), 'John - Doe')

  t.is(_(obj, 'a.e[0]["lol"].fn()', 'default'), 'default')
  t.is(_(obj, 'a.e[0]["lol"].fn2()', 'default'), 'default')
  t.is(_(obj, 'a.e.undefined[0].fn3()', 'John', 'Doe'), 'Doe')
})
