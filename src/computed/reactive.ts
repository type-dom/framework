import { Dep } from './dep';

export function reactive<T extends object>(target: T): T {
  const dep = new Dep();
  return new Proxy(target, {
    get(target, key) {
      dep.depend();
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      dep.notify();
      return true;
    }
  });
}
