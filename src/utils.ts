import { TypeElement } from './type-element/type-element.abstract';
import { ITypeElement } from './type-element/type-element.interface';
import { ITextNode } from './text-node/text-node.interface';
export function pxToRem(str: string): string {
  // 匹配:20px或: 20px不区分大小写
  const reg = /(\:|: )+(\d)+(px)/gi;
  return str.replace(reg, function (char: string) {
    const x = char.replace(/(\:|: )/, '').replace(/px/i, '');
    return ':' + parseFloat(x) / 100 + 'rem';
  });
}
export function getScroll(area?: Element): {x: number; y:number} {
  const body = {
    top:
      document.body.scrollTop > 0
        ? document.body.scrollTop
        : document.documentElement.scrollTop,
    left:
      document.body.scrollLeft > 0
        ? document.body.scrollLeft
        : document.documentElement.scrollLeft,
  };
  return {
    y: area && area.scrollTop >= 0 ? area.scrollTop : body.top,
    x: area && area.scrollLeft >= 0 ? area.scrollLeft : body.left,
  };
}
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
// 驼峰转中划线
export function humpToMiddleLine(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

const isLikelyNode = typeof Buffer !== 'undefined' && typeof window === 'undefined';
/**
 * 引用与非引用值 深拷贝方法
 * @param source
 */
export function deepClone<T>(source: T): T {
  if (typeof source !== 'object' || typeof source === 'function' || source === null) {
    return source;
  } else if (!isLikelyNode && source instanceof Element) {
    // avoid cloning deep images, canvases,
    return source;
  }
  let destination: T;
  if (Array.isArray(source)) {
    destination = [] as T;
  } else {
    destination = {} as T;
  }
  for (const i in source) {
    if (Object.prototype.hasOwnProperty.call(source, i)) {
      destination[i] = deepClone(source[i]);
    }
  }
  return destination;
}

export function deepCopy<T>(destination: T, source: T, deep?: boolean): T {
  // JScript DontEnum bug is not taken care of
  // the deep clone is for internal use, is not meant to avoid
  // javascript traps or cloning html element or self referenced objects.
  if (deep) {
    if (!isLikelyNode && source instanceof Element) {
      // avoid cloning deep images, canvases,
      destination = source;
    } else if (source instanceof Array) {
      destination = [] as T;
      for (let i = 0, len = source.length; i < len; i++) {
        (destination as any)[i] = deepCopy({ }, source[i], deep);
      }
    } else if (source && typeof source === 'object') {
      for (const property in source) {
        if (property === 'canvas') {
          destination[property] = deepCopy({} as any, source[property]);
        } else if (source.hasOwnProperty(property)) {
          destination[property] = deepCopy({} as any, source[property], deep);
        }
      }
    } else {
      // this sounds odd for an extend but is ok for recursive use
      destination = source;
    }
  } else {
    for (const property in source) {
      if (property) {
        destination[property] = source[property];
      }
    }
  }
  return destination;
}
// const template = "Hello, {{name}}!";
// const data = { name: "Alice" };
// const renderer = mustache(template);
// console.log(renderer(data)); // 输出 "Hello, Alice!"
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
export function add(a: number, b: number) {
  return a + b;
}
