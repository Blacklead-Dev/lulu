export function runHookFn(fn, ...args) {
  if (typeof fn === "function") {
    fn(...args);
  }
}