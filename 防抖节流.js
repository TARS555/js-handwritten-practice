function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoke = false;
  const _debounce = function (...args) {
    if (timer) timer = null;
    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
  return _debounce;
}

// 使用时间戳的节流函数会在第一次触发事件时立即执行，
// 以后每过 wait 秒之后才执行一次，并且最后一次触发事件不会被执行
function throttle(fn, delay) {
  let last = 0;
  const _throttle = function (...args) {
    let now = new Date().getDate();
    if (now - last >= delay) {
      fn.apply(this, args);
      last = now;
    }
  };
  return _throttle;
}

export default MyComponent;
