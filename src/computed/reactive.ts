import { Dep } from './dep';

export function reactive<T extends object>(target: T): T {
  const dep = new Dep();
  return new Proxy(target, {
    get(target, key) {
      dep.depend();
      return (target as any)[key];
    },
    set(target, key, value) {
      (target as any)[key] = value;
      dep.notify();
      return true;
    }
  });
}
