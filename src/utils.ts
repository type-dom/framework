import { deepClone } from '@type-dom/utils';
import { TypeElement } from './type-element/type-element.abstract';
import { ITypeElement } from './type-element/type-element.interface';
import { ITextNode } from './text-node/text-node.interface';
/**
 * 保存数据时使用。
 * 把当前数据层对象转换为 JSON 字面量。
 * 但是就数据层存储而言，是不需要转化page及其子元素的。
 */
export function toJSON(element: TypeElement): ITypeElement {
  return {
    nodeName: element.nodeName,
    className: element.className,
    propObj: {
      styleObj: deepClone(element.styleObj), // 两层。浅拷贝
      attrObj: deepClone(element.attrObj),
    },
    // items, page ----> 不起作用
    childNodes: element.childNodes.map(child => {
      if (child instanceof TypeElement) {
        return toJSON(child);
      } else {
        return {
          className: 'TextNode',
          nodeName: '#text',
          nodeValue: child.nodeValue, // textContent
        } as ITextNode;
      }
    })
  } as ITypeElement;
}

export function add(a: number, b: number) {
  return a + b;
}
