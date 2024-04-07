import { isArray, isObject } from '@type-dom/utils';
import { IXProxy, IXProxyConfig, IXProxyHandler, IXProxyProp } from './x-proxy.interface';

export class XProxy<T extends IXProxyConfig> implements IXProxy<T> {
  _target: T;
  _handler?: IXProxyHandler<T>;
  constructor(target: T, handler?: IXProxyHandler<T>) {
    this._target = target;
  }

  get(property: string) {
    const obj = this._target;
    let value  = obj[property];

    // 调用 handler 的 get 方法（如果已实现）
    if (this._handler && this._handler.get) {
      value = this._handler.get(this._target, property);
    }
    let result;
    // 这里可以添加你的自定义逻辑，如属性访问控制、计算属性等
    if (isObject(value)) {
      // 如果值是对象，你可以选择返回一个新的XProxy实例以支持嵌套
      result = new XProxy(value as IXProxyConfig);
    } else if(isArray(value)) {
      // todo 添加元素和删除元素 的监听。
      value.forEach(item => {
        if (isObject(item)) {
          result.push(new XProxy(item));
        }
      })
    } else {
      result = value;
    }
    return result;
  }

  set(prop: string, value: IXProxyProp) {
    const obj = this._target;
    // 调用 handler 的 set 方法（如果已实现）
    if (this._handler && this._handler.set) {
      return this._handler.set(this._target, prop, value);
    } else {
      // 如果未提供 handler 或者 handler 没有实现 set 方法，直接设置属性值并返回成功
      // @ts-ignore
      obj[prop] = value;
      console.log(`Set property ${prop} to ${value}`);
      return true;
    }
  }
}
