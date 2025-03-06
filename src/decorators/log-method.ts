export function logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling className is ${(target.constructor.name)}`);
    console.log(`Calling method ${key} with arguments ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`Finished calling method ${key}`);
    return result;
  };
}
