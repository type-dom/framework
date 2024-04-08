import { deepClone } from '@type-dom/utils';
import { TypeElement } from './type-element/type-element.abstract';
import type { ITypeElement } from './type-element/type-element.interface';
import type { ITextNode } from './text-node/text-node.interface';
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

export function mustacheNode(template: string, node: ITypeNode) {
  console.log('mustacheNode . ')
  const pattern = /\{\{([\w\s\.]+)\}\}/g;
  let result = template;
  let match;
  while (match = pattern.exec(template)) {
    const keys = match[1].trim().split('.');
    // @ts-ignore
    let value: any = node[keys[0] as string];
    for (let i = 1; i < keys.length; i++) {
      value = value[keys[i]];
    }
    if (value !== undefined) {
      result = result.replace(match[0], value);
    }
  }
  return result;
}
