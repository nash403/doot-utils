module.exports = function(obj, key, tgt, key2) {
  tgt[key2] = obj[key]
  delete obj[key]
  console.log('move') // , this);
  return tgt
}
