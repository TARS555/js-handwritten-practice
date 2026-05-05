function parseQuery(url) {
  const query = url.split("?")[1];
  if (!query) return {};

  const params = query.split("&");
  const res = {};

  params.forEach((param) => {
    let [key, value] = param.split("=");
    // 无值的 key 为 true
    value = value ? decodeURIComponent(value) : true;
    // 能转数字就转数字
    if (value !== true) {
      value = isNaN(Number(value)) ? value : parseFloat(value);
    }
    // 重复 key 转数组
    if (!res.hasOwnProperty(key)) {
      res[key] = value;
    } else {
      res[key] = [].concat(res[key], value);
    }
  });

  return res;
}
