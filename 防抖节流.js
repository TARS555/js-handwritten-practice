function debounce(fn, delay, immediate = false) {
  let timer = null;

  return function (...args) {
    // 1. 真正清除之前的定时器
    if (timer) clearTimeout(timer);

    if (immediate) {
      // 如果还没有正在运行的定时器，说明可以立即执行
      const callNow = !timer;

      timer = setTimeout(() => {
        timer = null; // 延迟结束后，重置 timer 为 null，允许下一次“立即执行”
      }, delay);

      if (callNow) fn.apply(this, args);
    } else {
      // 2. 普通延迟执行逻辑
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
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

function newDebounce(fn, delay) {
  let timer = null;
  return function _newDebounce(...args) {
    if (!timer) fn.apply(this, args);
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

function debounce(fn, delay, immediate = false) {
  let timer = null;
  function debounced(...args) {
    const runLeading = immediate && timer === null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);
    if (runLeading) fn.apply(this, args);
  }
  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}

function throttle(fn, delay) {
  let timer = null;
  function throttled(...args) {
    if (timer != null) return;
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  }
  throttled.cancel = () => {
    if (timer != null) clearTimeout(timer);
    timer = null;
  };
  return throttled;
}

function inspectThrottleScenario(scenario) {
  if (scenario === 'apiShape') {
    const throttled = throttle(() => { }, 120);
    return {
      isFunction: typeof throttled === 'function',
      hasCancel: typeof throttled.cancel === 'function',
    };
  }
  if (scenario === 'cancelIsSafe') {
    const throttled = throttle(() => { }, 50);
    throttled.cancel();
    throttled.cancel();
    return 'ok';
  }
}

module.exports = { inspectThrottleScenario };
