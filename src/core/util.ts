import { deepClone } from '@type-dom/utils';
import { IJsonData, IJsonDataProp } from '../interface';
import { TypeElement } from './type-element/type-element.abstract';
import { ITypeElement } from './type-element/type-element.interface';
import { ITextNode } from './text-node/text-node.interface';
import { ITypeNode } from './type-node/type-node.interface';

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
  console.log('mustacheNode . ');
  const pattern = /\{\{([\w\s\\.]+)\}\}/g;
  let result = template;
  let match;
  while ((match = pattern.exec(template))) {
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
