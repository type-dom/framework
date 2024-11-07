function logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling method ${key} with arguments ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`Finished calling method ${key}`);
    return result;
  };
}

class MyClass1 {
  @logMethod
  public myMethod(arg: string): string {
    return arg.toUpperCase();
  }
}

const instance1 = new MyClass1();
instance1.myMethod('hello'); // 输出 "Calling method myMethod with arguments [\"hello\"]" 和 "Finished calling method myMethod"
