// interface PropertyHistory {
//   [key: string]: string[];
// }

export function watchProperty(target: any, key: string, descriptor?: PropertyDescriptor) {
  let originalValue = descriptor?.get?.call(target);

  const getter = function() {
    console.log(`Getting value of ${key}: ${originalValue}`);
    return originalValue;
  };

  const setter = function(newValue: string) {
    console.log(`Setting value of ${key} to ${newValue}`);
    originalValue = newValue;
    // 记录属性的历史值
    if (!target.history[key]) {
      target.history[key] = [];
    }
    target.history[key].push(newValue);
  };

  if (descriptor) {
    // 删除原来的描述符，并设置新的 getter 和 setter
    delete descriptor.value;
    descriptor.get = getter;
    descriptor.set = setter;
  }
  return descriptor as any;
}

//
// class MyClass {
//   private history: PropertyHistory = {};
//
//   @watchProperty
//   myProperty = 'initial value';
//
//   constructor() {
//     console.log(`Initial value of myProperty: ${this.myProperty}`);
//   }
//
//   getHistory(key: string): string[] | undefined {
//     return this.history[key];
//   }
// }

//
// const instance = new MyClass();
// instance.myProperty = 'first change';
// instance.myProperty = 'second change';
// console.log(instance.myProperty); // 输出 "second change"
// console.log(instance.getHistory('myProperty')); // 输出 ["first change", "second change"]
