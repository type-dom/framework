function bindToView(target: any, key: string, descriptor?: PropertyDescriptor) {
  let originalValue = descriptor?.get?.call(target);

  const getter = function() {
    console.log(`Getting value of ${key}: ${originalValue}`);
    return originalValue;
  };

  const setter = function(newValue: any) {
    // console.log(`Setting value of ${key} to ${newValue}`);
    if (newValue !== originalValue) {
      originalValue = newValue;
      // 假设这里有一个方法可以更新视图
      updateView(originalValue);
    }
  };
  if (descriptor) {
    delete descriptor.value;
    descriptor.get = getter;
    descriptor.set = setter;
  }
  return descriptor as any;
}

class ViewModel {
  @bindToView
  public myProperty: string = 'initial value';

  constructor() {
    console.log(`Initial value of myProperty: ${this.myProperty}`);
  }
}

function updateView(value: string) {
  console.log(`Updating view with value: ${value}`);
  // 更新视图的逻辑，例如通过框架的 API 来更新视图
}

const vm = new ViewModel();
vm.myProperty = 'new value'; // 输出 "Setting value of myProperty to new value" 和 "Updating view with value: new value"
console.log(vm.myProperty);   // 输出 "Getting value of myProperty: new value" 和 "new value"
