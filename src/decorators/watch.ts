/**
 * 监视对象属性的变更
 * 当监视的属性被访问或修改时，会触发控制台日志输出
 *
 * @param target 要监视的目标对象
 * @param propertyKey 目标对象的属性键
 */
export function watch(target: any, propertyKey: string) {
  const originalValue = target[propertyKey];

  // 创建一个 Proxy 来拦截属性的访问和修改
  const proxy = new Proxy(originalValue, {
    get(target: any, prop: PropertyKey) {
      return target[prop];
    },
    set(target: any, prop: PropertyKey, value: any) {
      const oldValue = target[prop];
      const result = Reflect.set(target, prop, value);

      // 如果值发生变化，触发回调
      if (oldValue !== value) {
        console.log(`Property ${propertyKey}.${String(prop)} changed from ${oldValue} to ${value}`);
      }

      return result;
    }
  });

  // 将原始值替换为代理对象
  target[propertyKey] = proxy;

  // 递归处理嵌套属性
  for (const key in originalValue) {
    if (typeof originalValue[key] === 'object' && originalValue[key] !== null) {
      target[propertyKey][key] = watch({}, key);
    }
  }
}
