module.exports = function(obj, key) {
  console.log('get') // , this);
  return obj[key]
}
