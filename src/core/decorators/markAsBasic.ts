/**
 * 装饰器用于预设属性值，可以在调用 super() 之前设置属性
 *
 * @returns 返回一个装饰器函数
 */
export function markAsBasic() {
  return function<T extends { new (...args: any[]): object }>(constructor: T, context: ClassDecoratorContext) {
    context.addInitializer(function() {
    //
    });

    // 返回扩展的类以确保构造函数中的方法能被正确调用
    return class extends constructor {
      constructor(...args: any[]) {
        // console.warn(`LOG: Entering class ${context.name}.`)
        // console.log(`Creating new instance of ${constructor.name}`);
        super(...args);
        // console.log(`Finished creating new instance of ${constructor.name}`);
      }
    };
  };
}
