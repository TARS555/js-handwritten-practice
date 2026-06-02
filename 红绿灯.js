function red() {
  console.log("red")
}

function blue() {
  console.log("blue")
}

function green() {
  console.log("green")
}

const light = function(fn, time) {
  return new Promise((resolve, reject) => {
    fn();
    setTimeout(() => {
      resolve();
    }, time)
  })
}

const step = function() {
  Promise.resolve().then(() => {
    return light(red, 3000)
  }).then(() => {
    return light(blue, 2000)
  }).then(() => {
    return light(green, 1000)
  }).then(() => {
    return step();
  })
}

step();