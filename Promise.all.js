function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const res = [];
    let len = promises.length;
    if (!len) resolve(res);
    function fulfill(idx, val) {
      res[idx] = val;
      len--;
      if (!len) {
        resolve(res);
      }
    }

    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((val) => fulfill(idx, val))
        .catch((e) => reject(e));
    });
  });
}

function myPromiseAllsettled(promises) {
  return new Promise((resolve) => {
    const results = promises.map((promise) => {
      return Promise.resolve(promise).then(
        (value) => {
          return { status: "fulfilled", value };
        },
        (reason) => {
          return { status: "rejected", reason };
        },
      );
    });

    Promise.all(results).then((settledResults) => {
      resolve(settledResults);
    });
  });
};
