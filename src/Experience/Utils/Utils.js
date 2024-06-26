export function throttle(fn, wait) {
  return function (...args) {
    if (!throttleTimeout) {
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
        fn.apply(this, args);
      }, wait);
    }
  };
}
