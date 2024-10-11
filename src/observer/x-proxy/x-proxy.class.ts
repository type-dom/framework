import { deepClone, isPrimitive } from '@type-dom/utils';
import { AnyFn, IJsonData, IJsonDataProp } from '../../interface';
import { TypeElement } from '../../core/type-element/type-element.abstract';
import { TextNode } from '../../core/text-node/text-node.class';
import { IXProxy, IXProxyHandler } from './x-proxy.interface';

export class XProxy<T extends IJsonData> implements IXProxy<T> {
  _target: T;
  _handler?: IXProxyHandler<T>;
  _subs: AnyFn[] = [];
  value: any;
  // public proxy: { [P in keyof T]: T[P] };
  [key: string]: IJsonDataProp | T | IXProxyHandler<T> | any;

  // ToDo number | boolean | string | IJsonData | Array<number | boolean | string | IJsonData>
  // createProxy 中配置。
  constructor(target: T, handler?: IXProxyHandler<T>) {
    this._target = deepClone(target);
    this._handler = handler;
    // this.proxy = {} as { [P in keyof T]: T[P] }; // 初始化为空对象并暂时忽略类型错误
    for (const key in this._target) {
      if (Object.prototype.hasOwnProperty.call(this._target, key)) {
        // 将属性添加到internalObj中，并使用defineProperty设置拦截
        this.defineProperty(key, this._target[key]);
      }
    }
    makePropertyNonEnumerable(this, '_subs');
    // debugger;
  }

  // get value(): T {
  //   return this._value;
  // }
  //
  // set value(newValue: T) {
  //   this._value = newValue;
  //   this.observer.notify(newValue);
  // }
  addProp<K extends keyof T>(key: K, value: T[K]) {
    this.defineProperty(key, value);
  }

  private defineProperty<K extends keyof T>(key: K, initialValue?: T[K]): void {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: !(key === '_subs'),
      get() {
        let value: T[K] = this._target[key];

        // 调用 handler 的 get 方法（如果已实现）
        if (this._handler && this._handler.get) {
          value = this._handler.get(this._target, key) as T[K];
        }
        return value;
      },
      set(newValue: T[K]) {
        // console.log(
        //   `拦截到了对属性 "${String(key)}" 的赋值操作，新值为：`,
        //   newValue
        // );
        if (this[key] === newValue) {
          // console.error('新值与旧值相同，不进行赋值操作');
          return true;
        }
        if (this._handler && this._handler.set) {
          return this._handler.set(this, key as string, newValue);
        }
        this._target[key] = newValue;
        this.next(newValue);
        // 调用 handler 的 set 方法（如果已实现）
        // 如果未提供 handler 或者 handler 没有实现 set 方法，直接设置属性值并返回成功
        if (newValue instanceof XProxy) {
          if (this[key] === newValue) {
            return true;
          }
          this[key] = newValue as any;
        } else {
          // 新值不是 value 的情况， 要判断obj[key]本身是不是基础XProxy
          if (key === 'value') {
            if (this[key] === newValue) {
              return true;
            }
            this[key] = newValue as any; // this.value的值是普通数据类型，不是XProxy类型；
          } else {
            this[key] = createProxy(newValue) as any;
          }
        }
        return true;
      },
    });
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
      delete this._target[key];
      return true;
    }
    return false;
  }

  ownKeys(): (keyof T)[] {
    console.log('Enumerate keys operation');
    return Reflect.ownKeys(this._target) as (keyof T)[];
  }

  setNewProperty<K extends keyof T>(key: K, value: T[K]): void {
    this._target[key] = value;
    this.onNewProp(key, value); // todo 与下面的代码有什么区别？？？
    // this.defineProperty(key, value);
  }

  setValue(value: IJsonDataProp) {
    this.value = value as T;
  }

  addDep(element: TypeElement | TextNode, callback: (...rest: any[]) => void) {
    console.log('x-proxy addDep . ');
    this._subs.push(callback);
  }

  toJsonData(): IJsonData {
    if (this._target === void 0) {
      // 检查 this._target 是否为 null 或 undefined
      throw new Error('this._target is null or undefined');
    }
    const target: any = deepClone(this._target);
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        console.log('key: ', key, ' and value: ', target[key]);
        const value = target[key];
        // 使用类型守卫来检查 value 是否具有 value 属性
        if (
          typeof value === 'object' &&
          value !== null &&
          value.value === undefined
        ) {
          target[key] = this[key] ? this[key].toJsonData() : value;
        } else {
          target[key] = value.value;
        }
      }
    }
    return target;
  }

  next(data: T) {
    // console.log('next , data is ', data);
    this._subs.forEach(sub => {
      sub(data);
    })
  }
}

/**
 * 创建一个代理对象，用于拦截对目标对象的操作
 * @param target 需要被代理的目标对象，必须符合IJsonData接口的结构
 * @returns 返回一个XProxy类型的代理对象，该对象拦截对目标对象的读写操作，提供额外的功能或逻辑
 */
export function createProxy(target: IJsonDataProp): XProxy<IJsonData> {
  // 如果元素是数字、字符串或布尔值等基本数据类型，则创建一个包含该元素的代理对象
  if (isPrimitive(target)) {
    return new XProxy({ value: target } as IJsonData);
  }
  // 如果属性值是数组，则遍历数组，并为数组中的每个元素创建代理
  // if (isArray(target)) {
  //   const proxy = new XProxy({});
  //   for (const index in target) {
  //     const value = target[index];
  //     proxy[index] = createProxy(value);
  //   }
  //   return proxy;
  // }
  const proxy = new XProxy(target as IJsonData);
  // 遍历目标对象的所有属性，为每个属性创建适当的代理
  for (const [key, value] of Object.entries(
    target as IJsonData | IJsonData[]
  )) {
    // 如果属性值是数字、字符串或布尔值，则直接创建一个包含该值的代理对象
    proxy[key] = createProxy(value);
  }
  return proxy;
}

export function originalProxy(proxy: XProxy<IJsonData>) {
  console.log('originalTarget . ');

  const target: any = deepClone(proxy._target);
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      console.log('key: ', key, ' and value: ', target[key]);
      const value = target[key];
      if (value.value) {
        target[key] = value.value;
      } else {
        target[key] = originalProxy(proxy[key]);
      }
    }
  }
  return target;
}

export function makePropertyNonEnumerable<T extends object, K extends keyof T>(
  obj: T,
  key: K
): void {
  Object.defineProperty(obj, key, {
    configurable: true, // 是否可以被删除或修改特性
    enumerable: false, // 是否可枚举
    writable: true, // 是否可被重新赋值
    value: obj[key], // 属性的值
  });
}
