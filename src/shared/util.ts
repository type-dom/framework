import { deepClone } from '@type-dom/utils';
import { TypeElement } from '../core/type-element/type-element.abstract';
import type { ITypeElement } from '../core/type-element/type-element.interface';
import type { ITextNode } from '../core/text-node/text-node.interface';
import { ITypeNode } from '../core/type-node/type-node.interface';
import { IJsonData, IJsonDataProp } from '../interface';

/**
 * 保存数据时使用。
 * 把当前数据层对象转换为 JSON 字面量。
 * 但是就数据层存储而言，是不需要转化page及其子元素的。
 */
export function toJSON(element: TypeElement): ITypeElement {
  return {
    // nodeName: element.nodeName,
    nodeName: element.nodeName,
    className: element.className,
    styleObj: deepClone(element.styleObj), // 深拷贝
    attrObj: deepClone(element.attrObj), // 深拷贝
    settings: element?.settings,
    // items, page ----> 不起作用
    childNodes: element.childNodes.map((child) => {
      if (child instanceof TypeElement) {
        return toJSON(child);
      } else {
        return {
          // className: 'TextNode',
          // nodeName: '#text',
          nodeValue: child.nodeValue // textContent
        } as ITextNode;
      }
    })
  } as ITypeElement;
}

/**
 * 将模板字符串中的 Mustache 语法（{{}}）替换为节点中对应的属性值
 *
 * @param template 模板字符串
 * @param node 节点对象
 * @returns 替换后的字符串
 */
export function mustacheNode(template: string, node: ITypeNode) {
  console.log('mustacheNode . ')
  const pattern = /\{\{([\w\s\\.]+)\}\}/g;
  let result = template;
  let match;
  while (match = pattern.exec(template)) {
    const keys = match[1].trim().split('.');
    // @ts-ignore
    let value: any = node[keys[0]];
    for (let i = 1; i < keys.length; i++) {
      value = value[keys[i]];
    }
    if (value !== undefined) {
      result = result.replace(match[0], value);
    }
  }
  return result;
}

export function setProperty(target: IJsonData, propertyKey: string, value: IJsonDataProp, receiver = target) {
  if (typeof target !== 'object' && typeof target !== 'function') {
    throw new TypeError('target must be an object');
  }

  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

  if (descriptor && (descriptor.writable === false || !descriptor.configurable)) {
    return false;
  }

  try {
    // 检查是否存在访问器属性，并尝试调用set访问器
    if (descriptor && typeof descriptor.set === 'function') {
      descriptor.set.call(receiver, value);
      return true;
    }

    // 如果是常规属性或没有set访问器，则直接设置值
    target[propertyKey] = value;
    return true;
  } catch (error) {
    return false;
  }
}


export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object'
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | undefined {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val]
}

/**
 * Check if a tag is a built-in tag.
 */
export const isBuiltInTag = makeMap('slot,component', true)

/**
 * Check if an attribute is a reserved attribute.
 */
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

/**
 * Remove an item from an array.
 */
export function remove(arr: Array<any>, item: any): Array<any> | void {
  const len = arr.length
  if (len) {
    // fast path for the only / last item
    if (item === arr[len - 1]) {
      arr.length = len - 1
      return
    }
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(obj: object | Array<any>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
export function cached<R>(fn: (str: string) => R): (sr: string) => R {
  const cache: Record<string, R> = Object.create(null)
  return function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

/**
 * Capitalize a string.
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
// function polyfillBind(fn: Function, ctx: Object): Function {
//   function boundFn(a: any) {
//     const l = arguments.length
//     return l
//       ? l > 1
//         ? fn.apply(ctx, arguments)
//         : fn.call(ctx, a)
//       : fn.call(ctx)
//   }
//
//   boundFn._length = fn.length
//   return boundFn
// }

// function nativeBind(fn: Function, ctx: Object): Function {
//   return fn.bind(ctx)
// }

// export const bind = Function.prototype.bind ? nativeBind : polyfillBind

/**
 * Convert an Array-like object to a real Array.
 */
export function toArray(list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object.
 */
export function extend(
  to: Record<PropertyKey, any>,
  _from?: Record<PropertyKey, any>
): Record<PropertyKey, any> {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject(arr: Array<any>): object {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
export function noop(a?: any, b?: any, c?: any) {
  /* empty */
}

/**
 * Always return false.
 */
export const no = (a?: any, b?: any, c?: any) => false

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
export const identity = (_: any) => _

/**
 * Generate a string containing static keys from compiler modules.
 */
export function genStaticKeys(
  modules: Array<{ staticKeys?: string[] } /* ModuleOptions */>
): string {
  return modules
    .reduce<string[]>((keys, m) => keys.concat(m.staticKeys || []), [])
    .join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual(a: any, b: any): boolean {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e: any, i: any) => {
            return looseEqual(e, b[i])
          })
        )
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return (
          keysA.length === keysB.length &&
          keysA.every(key => {
            return looseEqual(a[key], b[key])
          })
        )
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e: any) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
export function looseIndexOf(arr: Array<unknown>, val: unknown): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
// export function once<T extends (...args: any[]) => any>(fn: T): T {
//   let called = false
//   return function () {
//     if (!called) {
//       called = true
//
//       fn.apply(this, arguments)
//     }
//   } as any
// }

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
export function hasChanged(x: unknown, y: unknown): boolean {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / (y as number)
  } else {
    return x === x || y === y
  }
}
