import { Subscription } from 'rxjs';
import { ITypeProperty } from '../type-element/type-element.interface';
import { ITextNode } from '../text-node/text-node.interface';

import { INodeAttr, IPath, ITypeNode } from './type-node.interface';
const Entities: Record<number, string> = {
  /* < */ 0x3c: '&lt;',
  /* > */ 0x3e: '&gt;',
  /* & */ 0x26: '&amp;',
  /* " */ 0x22: '&quot;',
  /* ' */ 0x27: '&apos;',
};
function encodeToDomString(str: string) {
  const buffer = [];
  let start = 0;
  for (let i = 0, ii = str.length; i < ii; i++) {
    const char = str.codePointAt(i)!;
    if (0x20 <= char && char <= 0x7e) {
      // ascii
      const entity = Entities[char];
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
/**
 * 虚拟DOM，TypeNode 抽象节点类, 所有节点类的基础类；
 * abstract syntax tree 抽象语法树 抽象节点类
 * 子类有:
 *    TypeElement
 *    TextNode
 */
export abstract class TypeNode implements ITypeNode {
  /**
   * 在生成dom字符串时，可以转为 attributes 的一个元素 { name: 'className', value: string }
   * 在定义className时，要把当前类写入到TypeMap中；
   */
  abstract className: string; // 最终实体类的名称，解析转换时需要创建对应的类；
  abstract dom: HTMLElement | SVGElement | Text;
  abstract parent?: TypeNode;
  /**
   * 渲染出真实DOM
   */
  abstract render(): void;
  // abstract setConfig?(config: any): void
  /**
   * 不独立为一个函数，是因为在这里，可以直接 this. 的方式调用。
   * 在子类，如UI组件中会重写
   * @param parent 不一定是this，还可以是父级、子级等等。
   * @param node
   */
  abstract createItem(parent: TypeNode, node: ITypeNode): TypeNode
  propObj?: ITypeProperty;
  nodeName: string;
  nodeValue?: string;
  childNodes?: TypeNode[];
  attributes?: INodeAttr[];
  configs?: Record<string, any>;
  data?: Record<string, any>;
  events?: Subscription[];
  protected constructor(nodeName: string, nodeValue?: string) {
    this.nodeName = nodeName;
    if (nodeValue !== undefined) {
      this.nodeValue = nodeValue;
    }
    // Object.defineProperty(this, "parentNode", { value: null, writable: true });
  }
  get firstChild(): TypeNode | undefined {
    return this.childNodes && this.childNodes[0];
  }
  get nextSibling(): TypeNode | undefined {
    const childNodes = this.parent?.childNodes;
    if (!childNodes) {
      return undefined;
    }
    const index = childNodes.indexOf(this);
    if (index === -1) {
      return undefined;
    }
    return childNodes[index + 1];
  }
  get textContent(): string | number | boolean {
    if (!this.childNodes) {
      return this.nodeValue || '';
    }
    return this.childNodes
      .map(function (child) {
        return child.textContent;
      })
      .join('');
  }
  get children(): TypeNode[] {
    return this.childNodes || [];
  }
  // 在定义className时，要把当前类写入到TypeMap中；
  //   todo 创建类实例时都要运行一遍。
  // setClassName(className: string, TypeClass: any) {
  //   this.className = className;
  //   const isExisted = TypeNode.typeMap.hasOwnProperty(className);
  //   if (!isExisted) {
  //     TypeNode.typeMap[className] = TypeClass;
  //   } else {
  //     if (TypeNode.typeMap[className] === TypeClass) {
  //       console.log('this.className has been existed . ');
  //     } else {
  //       throw Error('this.className has been defined . ');
  //     }
  //   }
  //   console.log('TypeNode.typeMap is ', TypeNode.typeMap);
  // }
  setParent(parent: TypeNode): void {
    this.parent = parent;
  }
  /**
   * 创建子节点
   * 与创建组件不同
   * 基于json对象创建类实例
   *   todo 运行时，类可能还没有写入 typeMap ????
   * @param parent
   * @param nodes
   */
  createItems(parent: TypeNode, nodes: ITypeNode[]): TypeNode[] {
    const items: TypeNode[] = [];
    for (const node of nodes) {
      if (node.TypeClass === undefined
        && node.template === undefined
        && node.nodeValue === undefined) {
        console.error('node.TypeClass is undefined  && node.template === undefined' +
          ' && node.template === undefined. ');
        continue;
      }
      const item = this.createItem(parent, node);
      if (item) {
        items.push(item);
      }
    }
    return items;
  }
  hasChildNodes(): boolean {
    return this.childNodes ? this.childNodes.length > 0 : false;
  }
  /**
   * Search a node in the tree with the given path
   * foo.bar[nnn], i.e. find the nnn-th node named
   * bar under a node named foo.
   *
   * @param {Array} paths - an array of objects as
   * returned by {parseXFAPath}.
   * @param {number} pos - the current position in
   * the paths array.
   * @returns {TypeNode} The node corresponding
   * to the path or null if not found.
   */
  searchNode(paths: IPath[], pos: number): TypeNode | null {
    if (pos >= paths.length) {
      return this;
    }
    const component = paths[pos];
    const stack: [TypeNode, number][] = [];
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let node: TypeNode = this;
    while (true) {
      if (component.name === node.nodeName) {
        if (component.pos === 0) {
          const res = node.searchNode(paths, pos + 1);
          if (res !== null) {
            return res;
          }
        } else if (stack.length === 0) {
          return null;
        } else {
          const [parent] = stack.pop()!;
          let siblingPos = 0;
          for (const child of parent.childNodes!) {
            if (component.name === child.nodeName) {
              if (siblingPos === component.pos) {
                return child.searchNode(paths, pos + 1);
              }
              siblingPos++;
            }
          }
          // We didn't find the correct sibling
          // so just return the first found node
          return node.searchNode(paths, pos + 1);
        }
      }
      if (node.childNodes && node.childNodes.length !== 0) {
        stack.push([node, 0]);
        node = node.childNodes[0];
      } else if (stack.length === 0) {
        return null;
      } else {
        while (stack.length !== 0) {
          const [parent, currentPos] = stack.pop()!;
          const newPos = currentPos + 1;
          if (newPos < parent.childNodes!.length) {
            stack.push([parent, newPos]);
            node = parent.childNodes![newPos];
            break;
          }
        }
        if (stack.length === 0) {
          return null;
        }
      }
    }
  }
  dump(buffer: string[]): void {
    if (this.nodeName === '#text') {
      buffer.push(encodeToDomString(this.nodeValue?.toString() || ''));
      return;
    }
    buffer.push(`<${this.nodeName}`);
    if (this.attributes) {
      for (const attribute of this.attributes) {
        buffer.push(
          ` ${attribute.name}="${encodeToDomString(attribute.value.toString())}"`
        );
      }
    }
    if (this.hasChildNodes()) {
      buffer.push('>');
      if (this.childNodes) {
        for (const child of this.childNodes) {
          child.dump(buffer);
        }
      }
      buffer.push(`</${this.nodeName}>`);
    } else if (this.nodeValue) {
      buffer.push(`>${encodeToDomString(this.nodeValue.toString())}</${this.nodeName}>`);
    } else {
      buffer.push('/>');
    }
  }
  /**
   * 保存json数据时使用。
   * 把当前数据层对象转换为 JSON 字面量。
   * 但是就数据层存储而言，是不需要转化page及其子元素的。
   * todo events如何处理？？
   */
  toJSON(): ITypeNode {
    return {
      nodeName: this.nodeName,
      className: this.className,
      attributes: this.attributes,
      childNodes: this.children.map(child => {
        if (child.nodeName === '#text') {
          return {
            className: 'TextNode',
            nodeName: '#text',
            nodeValue: child.nodeValue, // textContent
          } as ITextNode;
        } else {
          return child.toJSON();
        }
      })
    } as ITypeNode;
  }
}
