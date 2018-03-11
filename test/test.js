const test = require('ava')
const _ = require('../src')

test('simple get', t => {
  const o = {
    key: 6
  }
  t.is(
    _.dotify(o)
      .get('key')
      .collect(),
    6
  )
})

// Test('bar', async t => {
//   const bar = Promise.resolve('bar')

//   t.is(await bar, 'bar')
// })
