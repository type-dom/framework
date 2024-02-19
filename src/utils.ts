import { TypeElement } from './type-element/type-element.abstract';
import type { ITypeElement } from './type-element/type-element.interface';
import type { ITextNode } from './text-node/text-node.interface';
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
    propObj: {
      styleObj: Object.assign({}, element.styleObj), // 两层。浅拷贝
      attrObj: Object.assign({}, element.attrObj),
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
export function mustache(template: string, data: Record<string, string>) {
  const pattern = /\{\{([\w\s\.]+)\}\}/g;
  let result = template;
  let match;
  while (match = pattern.exec(template)) {
    const keys = match[1].trim().split('.');
    let value: any = data[keys[0]];
    for (let i = 1; i < keys.length; i++) {
      value = value[keys[i]];
    }
    if (value !== undefined) {
      result = result.replace(match[0], value);
    }
  }
  return result;
}
// 驼峰转中划线
export function humpToMiddleLine(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
export const XMLParserErrorCode = {
  NoError: 0,
  EndOfDocument: -1,
  UnterminatedCdat: -2,
  UnterminatedXmlDeclaration: -3,
  UnterminatedDoctypeDeclaration: -4,
  UnterminatedComment: -5,
  MalformedElement: -6,
  OutOfMemory: -7,
  UnterminatedAttributeValue: -8,
  UnterminatedElement: -9,
  ElementNeverBegun: -10,
};
/**
 * 是否空格
 * Checks if ch is one of the following characters: SPACE, TAB, CR or LF.
 * @param str
 * @param index
 */
export function isWhitespace(str: string, index: number): boolean {
  const ch = str[index];
  return ch === ' ' || ch === '\n' || ch === '\r' || ch === '\t';
  // return ch === 0x20 || ch === 0x09 || ch === 0x0d || ch === 0x0a;
}
/**
 * 是否连续的空格符
 * @param str
 */
export function isWhitespaceString(str: string): boolean {
  for (let i = 0, ii = str.length; i < ii; i++) {
    if (!isWhitespace(str, i)) {
      return false;
    }
  }
  return true;
}
export const XMLEntities = {
  /* < */ 0x3c: '&lt;',
  /* > */ 0x3e: '&gt;',
  /* & */ 0x26: '&amp;',
  /* " */ 0x22: '&quot;',
  /* ' */ 0x27: '&apos;',
};
/**
 * 转为xml字符串
 * @param value
 */
export function encodeToXmlString(value: string | number | boolean = ''): string {
  const buffer = [];
  let start = 0;
  const str = String(value);
  for (let i = 0, ii = str.length; i < ii; i++) {
    const char = str.codePointAt(i);
    if (char === undefined) {
      throw Error('char is undefined . ');
    }
    if (0x20 <= char && char <= 0x7e) {
      // ascii
      const entity = XMLEntities[char as keyof typeof XMLEntities];
      if (entity) {
        if (start < i) {
          buffer.push(str.substring(start, i));
        }
        buffer.push(entity);
        start = i + 1;
      }
    } else {
      if (start < i) {
        buffer.push(str.substring(start, i));
      }
      // todo 为什么转码 ？？？？？？
      buffer.push(`&#x${char.toString(16).toUpperCase()};`);
      if (char > 0xd7ff && (char < 0xe000 || char > 0xfffd)) {
        // char is represented by two u16
        i++;
      }
      start = i + 1;
    }
  }
  if (buffer.length === 0) {
    return str;
  }
  if (start < str.length) {
    buffer.push(str.substring(start, str.length));
  }
  return buffer.join('');
}
