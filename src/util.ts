import { deepClone, isArray, isFunction } from '@type-dom/utils';
import { Computed, Signal } from '@type-dom/signals';
import { castArray as ensureArray } from 'lodash-es';
import { isRef, toRaw } from './reactivity';
import type { IJsonData, IJsonDataProp } from './interface';
import { TypeNode } from './core/type-node/type-node.abstract';
import type { ISlotItem, IChild, ITypeNode } from './core/type-node/type-node.interface';
import type { ITextNode } from './dom/components/text-node/text-node.interface';
import type { ITypeElement } from './core/type-element/type-element.interface';
import { TypeHtml } from './core/components/type-html/type-html.abstract';
import { TypeSvg } from './core/components/type-svg/type-svg.abstract';

/**
 * 保存数据时使用。
 * 把当前数据层对象转换为 JSON 字面量。
 * 但是就数据层存储而言，是不需要转化page及其子元素的。
 */
export function toJSON(element: TypeHtml | TypeSvg): ITypeElement {
  return {
    // nodeName: element.nodeName,
    nodeName: element.$options.nodeName,
    className: element.className,
    params: {
      styleObj: deepClone(element.styleObj), // 深拷贝
      attrObj: deepClone(element.attrObj) // 深拷贝
    },
    settings: element?.settings,
    // items, page ----> 不起作用
    childNodes: element.childNodes.map((child) => {
      if (child instanceof TypeHtml || child instanceof TypeSvg) {
        return toJSON(child);
      } else {
        return {
          props: {
            nodeValue: child.$options.nodeValue // textContent
          }
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
  // console.log('mustacheNode . ');
  const pattern = /\{\{([\w\s\\.]+)\}\}/g;
  let result = template;
  let match;
  while ((match = pattern.exec(template))) {
    const keys = match[1].trim().split('.');
    let value: any = node[keys[0] as keyof ITypeNode];
    for (let i = 1; i < keys.length; i++) {
      value = value[keys[i]];
    }
    if (value !== undefined) {
      result = result.replace(match[0], value);
    }
  }
  return result;
}

export function setProperty(
  target: IJsonData,
  propertyKey: string,
  value: IJsonDataProp,
  receiver = target
) {
  if (typeof target !== 'object' && typeof target !== 'function') {
    throw new TypeError('target must be an object');
  }

  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

  if (
    descriptor &&
    (descriptor.writable === false || !descriptor.configurable)
  ) {
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

/**
 * 定义节点属性
 * @param node
 * @param key
 * @param value
 * @param handler
 */
export function defineNodeProperty(
  node: TypeNode, // this
  key: keyof TypeNode,
  value: IJsonDataProp
) {
  const property = Object.getOwnPropertyDescriptor(node, key);
  if (property && property.configurable === false) {
    return;
  }
  Object.defineProperty(node, key, {
    configurable: true,
    enumerable: true,
    get() {
      // 调用 handler 的 get 方法（如果已实现）
      if (value instanceof Signal || value instanceof Computed) {
        console.log(
          `defineNodeProperty 获取属性 "${key}" 的值，值为XProxy类型，值为：`,
          value
        );
      }
      return value;
    },
    /**
     * todo 节点的属性赋值还要完善。
     * 属性本身的值的类型有可能是：
     * 1. 普通数据类型： 基础数据类型和引用类型，包括数组和对象。
     * 2. XProxy类型
     * @param newValue
     */
    set(newValue) {
      // console.log(`defineNodeProperty 拦截到了对属性 "${key}" 的赋值操作，新值为：`, newValue);
      // 自定义逻辑...
      if (newValue instanceof Signal || newValue instanceof Computed) {
        // modelValue
        console.error(
          `defineNodeProperty 拦截到了对属性 "${key}" 的赋值操作，newValue为XProxy类型，且值为：`,
          newValue
        );
        //   todo 将当前对象加载到 XProxy 中。
      }
      if (node[key] instanceof Signal || newValue instanceof Computed) {
        // console.error('节点属性的值是XProxy类型。');
        (node as any)[key] = newValue;
      } else {
        (node as any)[key] = newValue;
      }
    }
  });
}

export function arraySlot<T extends IChild = IChild>(slot?: ISlotItem<T>): T[] {
  if (slot === undefined) {
    return [];
  }
  if (isArray(slot)) {
    return slot as T[];
  } else {
    return [slot] as T[];
  }
}

export function rawSlot<T extends IChild>(item: ISlotItem<T>): IChild[] {
  const result: IChild[] = [];

  function processItem(item?: ISlotItem<T>): void {
    if (isFunction(item)) {
      const rawItem = item();
      if (isArray(rawItem)) {
        rawItem.forEach(subItem => processItem(subItem));
      } else if (isRef(rawItem)) {
        result.push(toRaw(rawItem) as IChild);
      } else {
        if (rawItem !== undefined) {
          result.push(rawItem as IChild);
        }
      }
    } else if (isArray(item)) {
      item.forEach(subItem => processItem(subItem));
    } else if (isRef(item)) {
      result.push(...ensureArray(toRaw(item)));
    } else {
      if (item !== undefined) {
        result.push(item as IChild);
      }
    }
  }

  processItem(item);
  return result;
}
