import { AnyFn, convertEventName, isArray, isEventKey } from '@type-dom/utils';
import { addAttrObj, addStyleObj } from '../../dom';
import { TypeProps } from '../type-node/type-node.interface';
import { addEmits, on } from '../event-emitter/event-emitter';

export function beforeSetup<Props extends TypeProps>() {
  return function(originalMethod: any, context: ClassMethodDecoratorContext) {
    context.addInitializer(function() {
      const name = String(context.name);
      console.log(`method name is ${name}`);
    })
    const methodName = String(context.name);
    // 返回被装饰的方法，替换为带日志的新方法
    return function replacementMethod(this: any, ...args: any[]) {
      console.warn("LOG: Entering setup.");
      console.warn(`[LOG] 调用方法：${methodName}`);
      console.warn(`[LOG] 参数：${JSON.stringify(args)}`);
      const params = this.$options;
      for (const key in params) {
        // const namespace: ElementNamespace = element.isBasic ? '' : 'x-';
        // patchProp(element.dom as Element, key, props[key], props[key], namespace, element.parent);
        // styleObj, attrObj, events 要单独处理
        // todo 如果是 fragment ，要判断是否有子节点，
        //    只有一个子节点，styleObj就加到子节点上,
        //    如果是多个子节点，要怎么处理 ？？？？
        if (key === 'styleObj') {
          addStyleObj(this, params.styleObj);
        } else if (key === 'attrObj') {
          addAttrObj(this, params.attrObj); // todo 弹出框error
        } else if (key === 'emits') {
          this.$options.emits = params['emits'];
          addEmits(this, params['emits']);
        } else if (isEventKey(key)) {
          if (this.isBasic) {
            console.warn('element isBasic . event key is ', key);
            if (isArray(params[key])) {
              params[key].forEach((listener) => {
                on(this, convertEventName(key), listener as AnyFn);
              });
            } else {
              on(this, convertEventName(key), params[key] as AnyFn);
            }
          } else {
            // console.warn('element is component . event key is ', key);
            if (isArray(params[key])) {
              params[key].forEach((listener) => {
                on(this, convertEventName(key), listener as AnyFn, 'event');
              });
            } else {
              on(this, convertEventName(key), params[key] as AnyFn, 'emit');
            }
          }
          // (element.$options as T)[key] = params[key];
        } else {
          // if (key === 'visible' && config[key] === null) {
          //   console.warn('key is visible . value is null')
          // }
          // todo td-alert 样式不对
          // (element.$options as T)[key] = params[key];
        }
      }

      const result = originalMethod.call(this, ...args); // 调用原始方法
      console.warn("LOG: setup exits . ");
      return result;
    }
  }
}
