// 属性装饰器
export function logProperty(target: any, key: string) {
  let originalValue = target[key];

  Object.defineProperty(target, key, {
    get: function() {
      console.log(`Getting value of ${key}: `, originalValue);
      return originalValue;
    },
    set: function(newValue) {
      console.log(`Setting value of ${key} to `, newValue);
      originalValue = newValue;
    },
    enumerable: true,
    configurable: true
  });
}
