
function isEqual(obj1, obj2) {
  if (Object.is(obj1, obj2)) return true

  if (
    obj1 === null ||
    obj2 === null ||
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object'
  ) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (let key of keys1) {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return false
    }

    if (!isEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}


const obj1 = {
  a: 100,
  b: {
    x: 100,
    y: 200
  }
}
const obj2 = {
  a: 200,
  b: {
    x: 100,
    y: 200
  }
}
console.log(isEqual(obj1, obj2)) //false
