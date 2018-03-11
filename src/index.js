/* Var source = {
  "id": 1,
  "contact": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "example@gmail.com",
  }
}

ver tgt = {

}

var obj = {
  id: 'my-id',
  nes: { ted: { value: true } },
  other: { nested: { stuff: 5 } },
  some: { array: ['A', 'B'] }
}; */

// method (aliases,...): arguments | forwardedValue, value
// get: sourceObj, key (can be a fn call or falsy), [[args], [default]] | inner prop, inner prop
// set (modify): sourceObj, key, value | sourceObj modified, sourceObj modified
// copy (cp): sourceObj, keySource, tgtObj, keyTgt, [mods] | tgtObj modified, soureObj untouched
// move (mv): sourceObj, keySource, tgtObj, keyTgt, [mods] | tgtObj modified, sourceObj modified
// del (rm): sourceObj, key | sourceObj modified, deleted value
// expand: rowObj, [mods] | expandedObj(new obj), expandedObj(new obj)
// flatten (inspect): sourceObj, [mods] | flattenedObj(new obj), flattenedObj(new obj)
// keys: sourceObj | sourceObj untouched, flattened keys array
// values: sourceObj | sourceObj untouched, flatten values array
// union: sourceObj, key, value (array or not) | sourceObj modified, sourceObj modified
// pluck: sourceObj, keyArray, [mods] | newObjWithKeys, newObjWithKeys
// transform (assign): sourceObj, recipeObj | transformedObj, transformedObj   - trier par profondeur décroissante, si une clé a une valeur falsy c'est qu'on veut supprimer celle ci
// ?? use: obj, separator | obj, obj

/*
 * créer une fn avec des methods qui prennent tous en param un obj et qui retournent tous une fonction avec les meme methods mais préconfigurée pour ê appelé avec l'obj précédent et si on appelle la fonction et non une de ses methodes alors on retourne l'obj courant
 */

// dotty.get(source,'contact').set('lastName', 'Smith').copy('', obj, 'yap')

const get = require('./get')
const set = require('./set')
const move = require('./move')
const copy = require('./copy')
const del = require('./del')

function Dotify(obj) {
  this.value = obj
  this.chainValue = obj
  this.collect = () => {
    return this.value
  }
}

Dotify.prototype.get = function(...args) {
  const res = get(this.chainValue, ...args)
  this.value = res
  this.chainValue = res
  console.log('inner get', res, this)
  return this
}

Dotify.prototype.set = function(...args) {
  const res = set(this.chainValue, ...args)
  this.value = res
  this.chainValue = res
  console.log('inner set', res, this)
  return this
}

Dotify.prototype.move = function(...args) {
  const res = move(this.chainValue, ...args)
  this.value = res
  this.chainValue = res
  console.log('inner move', res, this)
  return this
}

Dotify.prototype.copy = function(...args) {
  const res = copy(this.chainValue, ...args)
  this.value = res
  this.chainValue = res
  console.log('inner copy', res, this)
  return this
}

Dotify.prototype.del = function(...args) {
  const res = del(this.chainValue, ...args)
  this.value = res
  console.log('inner del', res, this)
  return this
}

module.exports = {
  get,
  set,
  move,
  copy,
  del,
  dotify: obj => new Dotify(obj)
  //   Dotify(obj) {
  //     this.value = obj;
  //     this.chainValue = obj;
  //     this.get = obj => {
  //       let res = get(obj);
  //       this.value = obj;
  //       this.chainValue = obj;
  //       return this;
  //     };
  //     // console.log("fzfez", this);
  //   }
}

// Const Kitten = function(obj) {
// This.value = obj;
// this.chainValue = obj;
/* this.get = function(obj) {
    this.value = obj;
    this.chainValue = obj;
    console.log('get',JSON.stringify(this), this.value.obj)
    return this;
  };

  this.set = function(obj) {
    this.value = obj;
    this.chainValue = obj;
    console.log('set',JSON.stringify(this), this.value.obj)
    return this;
  };

  this.move = function(obj) {
    this.value = obj;
    this.chainValue = obj;
    console.log('move',JSON.stringify(this), this.value.obj)
    return this;
  }; */
// console.log('init',JSON.stringify(this), this.value.obj)
// return this.value
// }

// Kitten.prototype.get = function(obj) {
//   this.value = obj;
//   this.chainValue = obj;
//   console.log('get2',JSON.stringify(this), this.value.obj)
//   for (let p in this.__proto__) {
//       //console.log('proto',p)
//     this[p] = this.__proto__[p].bind(this, this.value)
//   }
//   return this;
// };

// Kitten.prototype.set = function(obj) {
//   this.value = obj;
//   this.chainValue = obj;
//   console.log('set2',JSON.stringify(this), this.value.obj)
//   return this;
// };

// Kitten.prototype.move = function(obj) {
//   this.value = obj;
//   this.chainValue = obj;
//   console.log('move2',JSON.stringify(this), this.value.obj)
//   return this;
// };

// let oldProto = Kitten.prototype
// Kitten = function (obj) {
//     this.value = obj;
//   this.chainValue = obj;
//   console.log('init',this)//JSON.stringify(this), this.value.obj)
//   return this.value
// }
// Kitten.prototype = oldProto

// let o1 = {obj: 1}
// let o2 = {obj: 2}
// let o3 = {obj: 3}
// let o4 = {obj: 4}

// console.log('result',
//     Kitten.get
//     //.get(o2)
//     //.set(o3)
//     //.move(o4)()
// )
