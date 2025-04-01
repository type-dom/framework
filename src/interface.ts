import { Fn, IPrimitive } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { Computed, MaybeRef, Signal } from '@type-dom/signals';

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

// export const Fragment = Symbol.for('v-fgt') as any as {
//   __isFragment: true
//   // new (): {
//   //   $props: VNodeProps
//   // }
// }
// export const Text: unique symbol = Symbol.for('v-txt')
// export const Comment: unique symbol = Symbol.for('v-cmt')
// export const Static: unique symbol = Symbol.for('v-stc')

// Renderer Node can technically be any object in the context of core renderer
// logic - they are never directly operated on and always passed to the node op
// functions provided via options, so the internal constraint is really just
// a generic object.
export interface RendererNode {
  [key: string | symbol]: any
}

export type RendererElement = RendererNode

// Vue's style normalization supports nested arrays
// export type StyleValue = string | undefined | IStyle | Array<StyleValue | undefined>

/**
 * Record<string, MaybeRef<string | number>>
 *   例如：
 * {
 *    '--el-switch-on-color': '#13ce66',
 *    '--el-switch-off-color': '#ff4949',
 *  }
 */
export type RawStyle =  IStyle | Record<string, MaybeRef<string | number | undefined>>
export type StyleValue = MaybeRef<RawStyle> | Signal<StyleValue | undefined> | Computed<StyleValue | undefined> | (StyleValue | undefined)[];
