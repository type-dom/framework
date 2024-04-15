import { deepClone, isArray, isBoolean, isNumber, isObject, isString, isUndefined } from '@type-dom/utils';
import { IJsonData, IJsonDataProp } from '../../../interface';
import { IXProxy, IXProxyHandler } from './x-proxy.interface';

export class XProxy<T extends IJsonData> implements IXProxy<T> {
  _target: T;
  _handler?: IXProxyHandler<T>;
  // public proxy: { [P in keyof T]: T[P] };
  private onNewProp: (key: keyof T, value: T[keyof T]) => void;
  [key: string]: IJsonDataProp | T | IXProxyHandler<T> | any;
  constructor(target: T, handler?: IXProxyHandler<T>) {
    this._target = deepClone(target);
    this._handler = handler;
    // this.proxy = {} as { [P in keyof T]: T[P] }; // 初始化为空对象并暂时忽略类型错误
    this.onNewProp = (key, value) => this.defineProperty(key, value);
    for (const key in this._target) {
      if (Object.prototype.hasOwnProperty.call(this._target, key)) {
        // 将属性添加到internalObj中，并使用defineProperty设置拦截
        this.defineProperty(key, this._target[key]);
      }
      // this[key] = target[key];
    }
  }

  private defineProperty<K extends keyof T>(key: K, initialValue: T[K]): void {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get() {
        // return this._target[key];
        const obj = this._target;
        let value  = obj[key];

        // 调用 handler 的 get 方法（如果已实现）
        if (this._handler && this._handler.get) {
          value = this._handler.get(this._target, key) as T[K];
        }

        // let result = value;
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
        // return result as T[K];
        // if (value instanceof XProxy) {
        //   result =  value.value;
        // }
        return value;
      },
      set(newValue: T[K]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log(`拦截到了对属性 "${key}" 的赋值操作，新值为：`, newValue);
        // 自定义逻辑...
        // this._target[key] = newValue;
        const obj = this._target;
        // 调用 handler 的 set 方法（如果已实现）
        if (this._handler && this._handler.set) {
          return this._handler.set(this._target, key as string, newValue);
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
      },
    });

    this._target[key] = initialValue; // 设置初始值
  }

  // 或者，重写赋值操作符（[]=）
  // 使SimpleProxy实例可索引，以便可以使用.[key]=的形式赋值
  // [key: keyof T]: any {
  //   get(): any {
  //     return this.get(key);
  //   }
  //   set(value: T[keyof T]): void {
  //     this.set(key, value);
  //   }
  // }

  deleteProperty(key: keyof T): boolean {
    console.log('Delete operation:', key);
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      delete this[key];
      delete this.originalTarget[key];
      return true;
    }
    return false;
  }

  ownKeys(): (keyof T)[] {
    console.log('Enumerate keys operation');
    return Reflect.ownKeys(this.originalTarget) as (keyof T)[];
  }

  setNewProperty<K extends keyof T>(key: K, value: T[K]): void {
    this.originalTarget[key] = value;
    this.onNewProp(key, value); // todo 与下面的代码有什么区别？？？
    // this.defineProperty(key, value);
  }
}

/**
 * 创建一个代理对象，用于拦截对目标对象的操作
 * @param target 需要被代理的目标对象，必须符合IJsonData接口的结构
 * @returns 返回一个XProxy类型的代理对象，该对象拦截对目标对象的读写操作，提供额外的功能或逻辑
 */
export function createProxy(target: IJsonData | string | number | boolean | undefined): XProxy<IJsonData> {
  if (isUndefined(target)) {
    throw Error('target is undefined');
  }
  if (isString(target) || isNumber(target) || isBoolean(target)) {
    return new XProxy({ value: target } as IJsonData);
  }
  const proxy = new XProxy(target as IJsonData);
  // 遍历目标对象的所有属性，为每个属性创建适当的代理
  for(const [key, value] of Object.entries(target)) {
    // 如果属性值是数字、字符串或布尔值，则直接创建一个包含该值的代理对象
    if (isNumber(value) || isString(value) || isBoolean(value)) {
      proxy[key] = new XProxy({ value: value });
    } else if (isArray(value)) {
      // 如果属性值是数组，则遍历数组，并为数组中的每个元素创建代理
      value.forEach((item, index) => {
        // 如果元素是数字、字符串或布尔值，则创建一个包含该元素的代理对象
        if (isNumber(item) || isString(item) || isBoolean(item)) {
          value[index] = new XProxy({ value: item });
        } else if (isObject(item)) {
          // 如果元素是对象，则递归地为该对象创建代理
          value[index] = createProxy(item as IJsonData);
        }
        // 将创建的代理对象添加到代理数组中
        proxy[key].push(value[index]);
      })
    } else if (isObject(value)) {
      // 如果属性值是对象，则递归地为该对象创建代理
      proxy[key] = createProxy(value as IJsonData);
    }
  }
  return proxy;
}
