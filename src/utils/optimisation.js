export function delay(func, wait) {
  let timeout; // this adds delay to the search function
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() =>  {
      func.call(this, ...args);
    }, wait);
  }
}
