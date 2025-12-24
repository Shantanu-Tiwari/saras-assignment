export function delay(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() =>  {
      func.call(this, ...args);
    }, wait);
  }
}
