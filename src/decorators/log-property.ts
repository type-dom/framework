// 属性装饰器
function logProperty(target: any, key: string) {
  let originalValue = target[key];

  Object.defineProperty(target, key, {
    get: function () {
      console.log(`Getting value of ${key}: ${originalValue}`);
      return originalValue;
    },
    set: function (newValue) {
      console.log(`Setting value of ${key} to ${newValue}`);
      originalValue = newValue;
    },
    enumerable: true,
    configurable: true
  });
}

class MyClass {
  @logProperty
  myProperty = 'initial value';

  constructor() {
    console.log(`Initial value of myProperty: ${this.myProperty}`);
  }
}

const instance = new MyClass();
instance.myProperty = 'new value'; // 输出 "Setting value of myProperty to new value"
console.log(instance.myProperty);   // 输出 "Getting value of myProperty: new value" 和 "new value"
