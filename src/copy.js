module.exports = function(obj, key, tgt, key2) {
  tgt[key2] = obj[key]
  console.log('copy') // , this);
  return tgt
}
