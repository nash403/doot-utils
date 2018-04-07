module.exports = function(pathString) {
  if (Array.isArray(pathString)) return [...pathString]
  if (typeof pathString === 'number') return [pathString]
  const pathArrayResult = []
  // From lodash
  const pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
  String(pathString).replace(pathRx, (match, number, quote, string) => {
    pathArrayResult.push(quote ? string : number === undefined ? match : Number(number))
    return pathArrayResult[pathArrayResult.length - 1]
  })
  return pathArrayResult
}
