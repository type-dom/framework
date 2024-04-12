import { Observer } from './lib/observer/observer';
import { XProxy } from './lib/observer/x-proxy/x-proxy.class';

/**
 * 一个通用的json数据结构的接口
 * 定义一个接口 IJsonConfig，它是一个键值对的集合，其中键是字符串类型，值是 IJsonProp 类型。
 */
export interface IJsonData {
  [propName: string]: IJsonDataProp;
}

/**
 * 定义一个联合类型 IJsonProp，它可以是以下任意类型：
 * - 字符串
 * - 数字
 * - 布尔值
 * - IJsonConfig 类型的单个实例
 * - IJsonConfig 类型的数组
 * - undefined
 * 这个类型用于表示 JSON 对象中的属性值，可以是简单的数据类型，也可以是嵌套的 JSON 对象或数组。
 */
export type IJsonDataProp = string | number | boolean | undefined | XProxy<IJsonData> | IJsonData | IJsonData[];

export interface IObData {
  '__ob__'?: Observer;
  [propName: string]: IObDataProp;
}

export type IObDataProp = string | number | boolean | Observer | IObData | IObData[] | undefined;
