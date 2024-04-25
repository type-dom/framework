import { Observer } from './lib/observer/observer';
import { XProxy } from './lib/observer/x-proxy/x-proxy.class';

export type IPrimitive = null | undefined | string | number | boolean | symbol | bigint;
type IBrowserNativeObject = Date | FileList | File | Blob | RegExp;
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
export type IJsonDataProp = IPrimitive | XProxy<IJsonData> | IJsonData | IJsonDataProp[];

export interface IObData {
  '__ob__'?: Observer;
  [propName: string]: IObDataProp;
}

export type IObDataProp = IPrimitive | Observer | IObData | IObData[];

// If the type T accepts type "any", output type Y, otherwise output type N.
// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
