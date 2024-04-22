import { isArray } from '@type-dom/utils';
import type { IJsonData, IJsonDataProp } from '../../../interface';
import { createProxy, XProxy } from './x-proxy.class';
import { IXProxyHandler } from './x-proxy.interface';

export function defineProxyProperty(proxy: XProxy<IJsonData>, key: string, value: IJsonDataProp, handler?: IXProxyHandler<IJsonData>) {
  const source = proxy._target;
  const property = Object.getOwnPropertyDescriptor(source, key);
  if (property && property.configurable === false) {
    return;
  }
  Object.defineProperty(proxy, key, {
    configurable: true,
    enumerable: true,
    get() {
      let value = source[key];

      // 调用 handler 的 get 方法（如果已实现）
      if (handler && handler.get) {
        value = handler.get(source, key as string);
      }
      // let result;
      // // 这里可以添加你的自定义逻辑，如属性访问控制、计算属性等
      // if (isObject(value)) {
      //   // 如果值是对象，你可以选择返回一个新的XProxy实例以支持嵌套
      //   result = new XProxy(value as IJsonData);
      // } else if(isArray(value)) {
      //   // todo 添加元素和删除元素 的监听。
      //   value.forEach(item => {
      //     if (isObject(item)) {
      //       result.push(new XProxy(item));
      //     }
      //   })
      // } else {
      //   result = value;
      // }
      // return result;
      return value;
    },
    set(newValue) {
      console.log(`拦截到了对属性 "${key}" 的赋值操作，新值为：`, newValue);
      // 自定义逻辑...
      console.log(`Setting property "${key}" to "${value}"`);
      const obj = source;
      // 调用 handler 的 set 方法（如果已实现）
      if (handler && handler.set) {
        return handler.set(source, key, value);
      } else {
        // 如果未提供 handler 或者 handler 没有实现 set 方法，直接设置属性值并返回成功
        if (obj[key] instanceof XProxy) {
          if (newValue instanceof XProxy) {
            obj[key] = newValue;
          } else if (isArray(newValue)) {
            //   todo
          } else {
            obj[key] = createProxy(newValue);
          }
        } else {
          obj[key] = newValue;
        }
        return true;
      }
    }
  });
}
