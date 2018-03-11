module.exports = function(obj, key, value) {
  obj[key] = value
  console.log('set') // , this);
  return obj
}
