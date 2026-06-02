const thousandSeparator = function(n) {
  n = n.toString();

  let count = 0;
  const arr = [];

  for (let i = n.length - 1; i >= 0; i--) {
    count++;

    if (count % 3 === 1 && count !== 1) {
      arr.push(",");
    }

    arr.push(n[i]);
  }

  return arr.reverse().join("");
};
