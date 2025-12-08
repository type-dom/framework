import { TypeProps } from '../type-node/type-node.interface';
import { assignProps } from '../helpers/assignProps';
import { onBeforeCreate } from '../apiLifecycle';

export function defaults<Props extends TypeProps>(defaultProps: Props) {
  return function(originalMethod: any, context: ClassMethodDecoratorContext) {
    context.addInitializer(function() {
      const name = String(context.name);
      console.log(`调用 ${name}`);
    })
    const methodName = String(context.name);
    // 返回被装饰的方法，替换为带日志的新方法
    return function replacementMethod(this: any, ...args: any[]) {
      console.warn("LOG: Entering method.");
      console.warn(`[LOG] 调用方法：${methodName}`);
      console.warn(`[LOG] 参数：${JSON.stringify(args)}`);
      onBeforeCreate(() => {
        assignProps(this, defaultProps);
      })
      const result = originalMethod.call(this, ...args); // 调用原始方法
      console.warn("LOG: Exiting method.")
      return result;
    }
  }
}
