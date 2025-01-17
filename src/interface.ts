import { Computed, Signal } from '@type-dom/signals';

export type IPrimitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;
type IBrowserNativeObject = Date | FileList | File | Blob | RegExp;

export type IWritableObj = {
  get(): unknown,
  set(val: unknown): void
}
/**
 * 一个通用的json数据结构的接口
 * 定义一个接口 IJsonConfig，它是一个键值对的集合，其中键是字符串类型，值是 IJsonProp 类型。
 */
export interface IJsonData {
  [propName: string]: IJsonDataProp;
}

/**
 * 定义一个联合类型 IJsonDataProp，它可以是以下任意类型：
 * - 字符串
 * - 数字
 * - 布尔值
 * - IJsonConfig 类型的单个实例
 * - IJsonConfig 类型的数组
 * - undefined
 * 这个类型用于表示 JSON 对象中的属性值，可以是简单的数据类型，也可以是嵌套的 JSON 对象或数组。
 */
export type IJsonDataProp =
  | IPrimitive
  | IJsonData
  | IJsonDataProp[];

export interface IObData {
  // __ob__?: Observer;

  [propName: string | number | symbol]: IObDataProp;
}

export type IObDataProp = IPrimitive | IObData | IObData[];

/**
 * Void function
 */
export type Fn = () => void

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any

export interface Stoppable<StartFnArgs extends any[] = any[]> {
  /**
   * A ref indicate whether a stoppable instance is executing
   */
  isPending: Readonly<boolean>;

  /**
   * Stop the effect from executing
   */
  stop: Fn;

  /**
   * Start the effects
   */
  start: (...args: StartFnArgs) => void;
}

export type Arrayable<T> = T[] | T
