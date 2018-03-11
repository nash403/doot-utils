module.exports = function(obj, key) {
  const res = obj[key]
  delete obj[key]
  console.log('delete') // , this);
  return res
}
