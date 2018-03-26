// Method (aliases,...): arguments | forwardedValue, value
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

const get = require('./lib/get')
const set = require('./lib/set')
const move = require('./lib/move')
const copy = require('./lib/copy')
const del = require('./lib/del')

class Doot {
  constructor(obj) {
    this.objectRef = obj
    this.value = obj
    this.chainValue = obj
  }

  root(obj) {
    this.value = obj || this.objectRef
    this.chainValue = obj || this.objectRef
    return this
  }

  static use(fn) {
    fn(Doot)
  }

  get(...args) {
    const res = get(this.chainValue, ...args)
    this.value = res
    this.chainValue = res
    return this
  }

  set(...args) {
    this.value = set(this.chainValue, ...args)
    return this
  }

  del(...args) {
    this.value = del(this.chainValue, ...args)
    return this
  }

  move(...args) {
    const res = move(this.chainValue, ...args)
    this.value = res
    this.chainValue = res
    console.log('inner move', res, this)
    return this
  }

  copy(...args) {
    const res = copy(this.chainValue, ...args)
    this.value = res
    this.chainValue = res
    console.log('inner copy', res, this)
    return this
  }
}

module.exports = {
  get,
  set,
  move,
  copy,
  del,
  Doot,
  dootify: obj => new Doot(obj)
}
