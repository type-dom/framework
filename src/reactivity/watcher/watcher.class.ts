import { IJsonData, IJsonDataProp } from '../../interface';
import { Dep } from '../dep/dep.class';
import { isObject } from '@type-dom/utils';

type ICallback = (newVal: IJsonDataProp, oldVal: IJsonDataProp) => void;

export class Watcher {
  private target: IJsonData;
  private expr: string;
  private cb: ICallback;
  private value: IJsonDataProp;

  constructor(target: IJsonData, expr: string, cb: ICallback) {
    this.target = target;
    this.expr = expr;
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.evaluate(this.target, this.expr);
    Dep.target = undefined;
    return value;
  }

  /**
   * 根据提供的JSON对象和表达式，评估并返回表达式的值
   *
   * @param obj IJsonData类型，表示要评估的JSON对象
   * @param expr 字符串类型，表示用于评估的表达式，可以是嵌套属性的路径（用点分隔）
   * @returns 返回评估后的属性值，类型为IJsonDataProp
   *
   * 该函数通过拆分表达式字符串为属性名数组，并遍历这些属性名，从给定的JSON对象中逐步获取嵌套属性的值
   * 它主要用于动态地访问和获取嵌套属性的值，而不需要手动编写多层的访问代码
   */
  evaluate(obj: IJsonData, expr: string) {
    console.log('evaluate . ');
    // 将表达式字符串拆分为属性名数组
    const keys = expr.split('.');
    // 定义一个变量，用于存储最终的属性值
    const objRes: IJsonDataProp = this.getNestedProperty(obj, keys);

    // 遍历属性名数组，逐步获取嵌套属性的值
    // while (keys.length) {
    //   // 从数组中移除第一个属性名，并用它从当前对象中获取相应的属性值 ToDo 一次性获取 ？
    //   objRes = (objRes as IJsonData)[keys.shift() as string]; // 沿着路径多次get
    // }

    // 返回最终的属性值
    return objRes;
  }

  /**
   * 根据属性名数组获取嵌套对象的属性值。
   * @param obj - 嵌套对象
   * @param path - 属性名数组
   * @returns 属性值或 undefined
   */
  getNestedProperty(obj: IJsonData, path: string[]): any {
    // 检查输入是否有效
    if (!isObject(obj) || !Array.isArray(path)) {
      throw new Error('Invalid input: obj must be an object and path must be an array.');
    }

    // 使用 reduce 来遍历路径
    return path.reduce((acc: any, curr) => {
      // 如果当前累积值为 null 或 undefined，则返回 undefined
      if (acc == null) return undefined;

      // 返回下一层的对象或属性值
      return acc[curr];
    }, obj);
  }

  update() {
    const value = this.evaluate(this.target, this.expr);
    const oldValue = this.value;
    if (value !== oldValue) {
      this.value = value;
      this.cb.call(this.target, value, oldValue);
    }
  }
}
