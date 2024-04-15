import { IJsonData, IJsonDataProp } from '../../interface';
import { isBoolean, isNumber, isObject, isString, isArray } from '@type-dom/utils';
import { Dep } from './dep';
// import Dep from './dep';

function parsePath(str: string) {
  const segments = str.split('.');
  return (obj: IJsonData) => {
    let result: IJsonDataProp = obj;
    for (let i = 0; i < segments.length; i++) {
      if (
        !result
        || isNumber(result)
        || isString(result)
        || isBoolean(result)
        || isArray(result)
      ) return;
      result = (result as IJsonData)[segments[i]];
    }
    return obj;
  };
}

export class Watcher {
  // target 目标对象
  // expression 属性名
  // callback 回调函数
  // value 属性的值
  private target: IJsonData;
  private getter: (obj: IJsonData) => (undefined | IJsonData);
  private callback: (val: IJsonData | undefined, oldValue: IJsonData | undefined) => void;
  private value?: IJsonData;

  constructor(target: IJsonData, expression: string, callback: (val: IJsonData | undefined, oldValue: IJsonData | undefined) => void) {
    this.target = target;
    // parsePath 为一个高阶函数
    this.getter = parsePath(expression);
    this.callback = callback;
    // get为我们之后要写的获取值的方法
    this.value = this.get();
  }

  // Dep发过来的通知，当前变量更新了，我们返回一个更新之后的回调函数
  update() {
    // this.value 由于还没触发更新，所以此时是旧的值
    const oldValue = this.value;
    // 通过我们的 getter 方法，直接获取最新的值
    const newValue = this.get();
    // 将新值和旧值返回给 callback 回调函数
    this.callback(newValue, oldValue);
  }

  // 获取当前的值，并将它更新，然后 return 返回
  get() {
    // 进入依赖收集阶段，将 Dep.target 设为 Watcher 实例本身
    Dep.target = this;

    // 当前对象
    const obj = this.target;
    let value;
    // 当对象不再使用的时候，我们需要将它清空
    try {
      value = this.getter(obj);
    } finally {
      Dep.target = undefined;
    }
    this.value = value;
    return value;
  }
}
