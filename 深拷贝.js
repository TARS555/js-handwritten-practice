function DeepCopy(obj, hash = new WeakMap()) {
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Error) return new Error(obj.message);
  if (obj instanceof Function)
    return function (...args) {
      return obj.call(this, ...args);
    };

  // 优化：处理 null 的逻辑更清晰一点
  if (obj === null || typeof obj !== "object") return obj;

  // 2. 查字典：如果这个对象已经被拷贝过了，直接返回之前克隆好的结果，打断死循环！
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  let newObj = Array.isArray(obj) ? [] : {};

  // 3. 登记：把当前正在拷贝的对象，以及它对应的新对象，存入记事本
  hash.set(obj, newObj);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        // 4. 核心步骤：把记事本 hash 顺着递归传下去！
        newObj[key] = DeepCopy(obj[key], hash);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}
