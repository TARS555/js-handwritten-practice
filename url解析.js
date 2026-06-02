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

function parseQuery(url) {
  const queryString = url.split("#")[0].split("?")[1];
  if (!queryString) return {};

  const res = {};

  queryString.split("&").forEach((param) => {
    if (!param) return;

    const index = param.indexOf("=");

    let key;
    let value;

    if (index === -1) {
      key = param;
      value = true;
    } else {
      key = param.slice(0, index);
      value = param.slice(index + 1);
      value = decodeURIComponent(value.replace(/\+/g, " "));
    }

    key = decodeURIComponent(key.replace(/\+/g, " "));

    if (!Object.prototype.hasOwnProperty.call(res, key)) {
      res[key] = value;
    } else {
      res[key] = [].concat(res[key], value);
    }
  });

  return res;
}
