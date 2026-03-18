function myNew(fn, ...args) {
  if (Object.prototype.toString.call(fn) !== "[object Function]") {
    return "Error in params";
  }
  const obj = Object.create(fn.prototype);
  let ret = fn.call(obj, ...args);
  return ret instanceof Object ? ret : obj;
}
