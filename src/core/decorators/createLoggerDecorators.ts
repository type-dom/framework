// import { isDevEnv } from '@type-dom/utils';
// 装饰器工厂：可配置的日志装饰器
function createLoggerDecorators(options: {
  enableAbstractLog?: boolean;
  enableConcreteLog?: boolean;
  enableMethodLog?: boolean;
  enablePropertyLog?: boolean;
}) {
  // 类装饰器  todo 传参 方法
  const abstractDecorator = () => {
    return  function logAbstract<T extends abstract new (...args: any[]) => any>(constructor: T, context: ClassDecoratorContext) {
      if (!options.enableAbstractLog) return;
      // 添加类初始化时的钩子
      context.addInitializer(function() {
        // 输出类定义处理完成的信息
        console.log(`Class ${context.name} definition processed`);
      });

      // 保存原始构造函数
      const originalConstructor = constructor;

      // 创建新的构造函数包装器
      const wrappedConstructor: any = function(this: any, ...args: any[]) {
        // 记录类实例化信息
        console.warn([`[LOG] Abstract Class：${originalConstructor.name}`]);
        console.warn([`[LOG] Concrete Class：${new.target.name}`]);
        console.warn(`[LOG] Arguments：`, args);

        // 使用 Reflect.construct 来正确处理抽象类和具体类的实例化
        // 这样可以确保即使在抽象类上使用装饰器也能正常工作
        const instance = Reflect.construct(originalConstructor, args, new.target) as T;

        console.warn(`[LOG] Instance created success :${new.target.name}`);
        return instance as T;
      };

      // 复制原型链
      wrappedConstructor.prototype = originalConstructor.prototype;

      // 确保 constructor 属性正确指向
      wrappedConstructor.prototype.constructor = wrappedConstructor;

      // 返回包装后的构造函数
      return wrappedConstructor as T;
    }

  };
  const concreteDecorator = (beforeSuper?: () => void, afterSuper?: () => void) => {
    return function logConcrete<T extends { new (...args: any[]): object }>(
      constructor: T,
      context: ClassDecoratorContext
    ) {
      if (!options.enableConcreteLog) return;
      context.addInitializer(function () {
        console.log(`Class ${context.name} definition processed`);
        // return constructor;
      });
     return class extends constructor {
       constructor(...args: any[]) {
         console.warn(`LOG: Entering class ${context.name}.`);
         console.log(`Creating new instance of ${constructor.name}`);
         beforeSuper?.();
         super(...args);
         afterSuper?.();
         console.log(
           `Finished creating new instance of ${constructor.name}`
         );
       }
     };
    };
  };

  // 方法装饰器
  const methodDecorator = () => {
    return function logMethod(originalMethod: any, context: ClassMethodDecoratorContext) {
      if (!options.enableMethodLog) return originalMethod;
      const methodName = String(context.name);
      const isStatic = context.static;
    // 返回被装饰的方法，替换为带日志的新方法
      return function replacementMethod(this: any, ...args: any[]) {
        console.warn("LOG: Entering method.");
        console.warn(`[LOG] 调用方法：${methodName}`);
        console.warn(`[LOG] 调用类：${isStatic ? context.name : this.constructor!.name}`);
        console.warn(`[LOG] 参数：${JSON.stringify(args)}`);
        const result = originalMethod.call(this, ...args); // 调用原始方法
        console.warn(`[LOG] 返回值：${JSON.stringify(result)}`);
        console.warn("LOG: Exiting method.")
        return result;
      }
    }

  };

  // 属性装饰器
  const propertyDecorator = () => {
    return  function logProperty(value: any, context: ClassFieldDecoratorContext) {
      if (!options.enablePropertyLog) return value;
      // 保存初始值
      const initialValue = value;

      context.addInitializer(function() {
        // 获取属性名
        const propertyName = String(context.name);

        // 获取当前属性值（可能已在构造函数中设置）
        let internalValue = Object.hasOwn(this as unknown as object, propertyName) ? (this as any)[propertyName] : initialValue;

        // 获取当前属性描述符
        const existingDescriptor = Object.getOwnPropertyDescriptor(this, propertyName);
        if (existingDescriptor && !existingDescriptor.configurable) {
          console.warn(`属性 ${propertyName} 已被锁定，无法重新定义`);
          return;
        }

        // 创建新的属性描述符
        const newDescriptor: PropertyDescriptor = {
          get() {
            console.log(`Getting property ${propertyName}: `, internalValue);
            return internalValue;
          },
          set(newValue: any) {
            // 如果原属性是只读的，则不允许设置
            if (existingDescriptor && !existingDescriptor.writable && !existingDescriptor.set) {
              throw new TypeError(`Cannot assign to read only property '${propertyName}'`);
            }

            console.log(`Setting property ${propertyName}: `, internalValue, ` => `, newValue);
            internalValue = newValue;
          },
          enumerable: true,
          // 保持原有的 configurable 特性
          configurable: existingDescriptor ? existingDescriptor.configurable : true
        };

        // 定义属性
        Object.defineProperty(this, context.name, newDescriptor);
      });
    }
  };
  // const logWithMetadata = (options: { enableMethodLog: boolean }) => {
  //   return (value: any, context: ClassMethodDecoratorContext) => {
  //     if (!options.enableMethodLog) return value;
  //
  //     const parameters = Reflect.getMetadata("design求数字", context.target!, context.name!);
  //     const returnType = Reflect.getMetadata("design求数字", context.target!, context.name!)?.returnType;
  //
  //     return function replacementMethod(...args: any[]) {
  //       console.log(`[LOG] 调用方法：${context.name!}`);
  //       console.log(`[LOG] 调用类：${context.target!.name}`);
  //       console.log(`[LOG] 参数类型：${JSON.stringify(parameters)}`);
  //       console.log(`[LOG] 参数值：${JSON.stringify(args)}`);
  //       const result = value.apply(this, args);
  //       console.log(`[LOG] 返回值类型：${returnType}`);
  //       console.log(`[LOG] 返回值：${JSON.stringify(result)}`);
  //       return result;
  //     };
  //   };
  // }

  return {
    abstract: abstractDecorator,
    concrete: concreteDecorator,
    method: methodDecorator,
    property: propertyDecorator
  };
}

export const logger = createLoggerDecorators({
  // enableAbstractLog: isDevEnv(),
  // enableConcreteLog:  isDevEnv(),
  // enableMethodLog:  isDevEnv(),
  // enablePropertyLog:  isDevEnv()
});
