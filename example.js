const _ = require('./src')

// Const test = { obj: { val: -1 } }
// const testTarget = { obj: { val: 0 } }
const o1 = { obj: { val: 1 } }
const o2 = { obj: { val: 2 } }
const o3 = { obj: { val: 3 } }
const o4 = { obj: { val: 4 } }

console.log(
  'dotify',
  _.dotify(o1)
    .get('obj')
    .set('val', 'new value')
    .move('val', o2, 'obj')
    .copy('obj', o3, 'obj')
    .del('obj')
)

// _.dotify(o4);
// console.log("=>", _.get(o1, "obj"));
// console.log("=>", _.set(o2, "obj", "new value"));
// console.log("=>", _.move(o3, "obj", o4, "newkey"));
console.log('AFTER', JSON.stringify(o1), '-', JSON.stringify(o2), '-', JSON.stringify(o3), '-', JSON.stringify(o4), '-')
// Console.log("dotify", _.dotify());
