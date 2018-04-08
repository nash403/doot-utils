const DootUtils = require('./core')
const move = require('./lib/plugins/move')
const copy = require('./lib/plugins/copy')

DootUtils.Doot.use(Doot => {
  Doot.prototype.copy = function(key, target, targetKey, mod, doMove) {
    this.value = copy(this.chainValue, key, target, targetKey, mod, doMove)
    this.chainValue = target
    return this
  }
})

DootUtils.Doot.use(Doot => {
  Doot.prototype.move = function(key, target, targetKey, mod) {
    this.value = move(this.chainValue, key, target, targetKey, mod)
    this.chainValue = target
    return this
  }
})

module.exports = Object.assign({}, DootUtils, {
  copy,
  move
})

// TODO:
// pluck (get en gardant structure et mod)
// expand (créer structure)
// keys (coe keys mais en profondeur)
// values (coe values mais en profondeur)
// keysOf (inspect en profondeur, liste des clés)
// getAll (get avec une liste de clés)
// setAll (set avec une liste de clés)
