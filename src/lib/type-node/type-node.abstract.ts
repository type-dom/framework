import { Subscription } from 'rxjs';
import { encodeToXmlString, humpToMiddleLine } from '@type-dom/utils';
import type { ITypeProperty } from '../type-element/type-element.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import type { INodeAttr, IPath, ITypeNode } from './type-node.interface';
import { TypeRoot } from '../type-root/type-root.abstract';

/**
 * 虚拟DOM，TypeNode 抽象节点类, 所有节点类的抽象类；
 * abstract syntax tree 抽象语法树 抽象节点类
 * 子类有:
 *    TypeElement
 *    TextNode
 *    XElement
 */
export abstract class TypeNode implements ITypeNode {
  /**
   * 在生成dom字符串时，可以转为 attributes 的一个元素 { name: 'className', value: string }
   * 在定义ClassName时，要把当前类写入到TypeMap中；
   */
  abstract className?: string; // 最终实体类的名称，解析转换时需要创建对应的类；
  abstract nodeName?: string;
  abstract nodeValue?: string;
  abstract childNodes?: TypeNode[];
  abstract dom?: HTMLElement | SVGElement | Text;
  abstract parent?: TypeElement;

  /**
   * 渲染出真实DOM
   */
  abstract render(): void;

  // abstract setConfig?(config: any): void
  /**
   * 不独立为一个函数，是因为在这里，可以直接 this. 的方式调用。
   * 在子类，如UI组件中会重写
   * 子类有： TypeElement,XElement,TextNode
   * @param parent 不一定是this，还可以是父级、子级等等。
   * @param node
   */
  abstract createItem(parent: TypeNode, node: ITypeNode): TypeNode;

  isRoot?: boolean; // 是否是根节点 只有TypeRoot才为true
  propObj?: ITypeProperty;
  attributes?: INodeAttr[];
  configs?: Record<string, any>;
  data?: Record<string, any>;
  methods?: Record<string, any>;
  template?: string;
  events?: Subscription[];
  // protected constructor() {
  //   Object.defineProperty(this, "parentNode", { value: null, writable: true });
  // }
  /**
   * 获取根节点;
   * 在应用项目中才会用到，在框架中是用不到的。
   * 应用项目中，根节点要设置 isRoot 为 true，这样就能获取到根节点了
   * 问题： 无法获取应用项目主类的方法和属性；
   */
  get root(): TypeNode | undefined {
    if (this?.isRoot) {
      return this;
    } else {
      // 要保证parent不为null，否则会报错。要保证应用项目中的parent都设置过了。
      return this.parent?.root;
    }
  }
  get firstChild(): TypeNode | undefined {
    return this.childNodes && this.childNodes[0];
  }

  get lastChild(): TypeNode | undefined {
    return this.childNodes && this.childNodes[this.childNodes.length - 1];
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
      .map(function(child) {
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
  setParent(parent: TypeElement): void {
    this.parent = parent;
    parent.addChild(this);
  }

  appendParent(parent: TypeElement): void {
    parent.addChild(this);
  }

  /**
   * 创建子节点
   * 与创建组件不同
   * 基于json对象创建类实例
   *   todo 运行时，类可能还没有写入 typeMap ????
   *      默认加载XElement,TextNode,其它类要 TypeClass显式调用
   * @param parent
   * @param nodes
   */
  createItems(parent: TypeNode, nodes: ITypeNode[]): TypeNode[] {
    const items: TypeNode[] = [];
    for (const node of nodes) {
      if (
        node.TypeClass === undefined &&
        node.template === undefined &&
        node.nodeValue === undefined
      ) {
        console.error(
          'node.TypeClass === undefined' +
          '  && node.template === undefined' +
          ' && node.nodeValue === undefined. '
        );
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
   * 找到指定类名的节点
   * @param className
   */
  findNode(className: string): TypeNode | null  {
    console.log('findNode className is ', className);
    for (const child of this.children) {
      if (child?.className === className) {
        return child;
      } else if (child.children.length > 0) {
        return child.findNode(className);
      }
    }
    return null;
  }

  /**
   * Search a node in the tree with the given path
   * foo.bar[nnn], i.e. find the nnn-th node named
   * bar under a node named foo.
   * 假设我们有一个如下的XML树状结构简化版（实际应用中可能是更复杂的XFA文档结构）：
   * <root>
   *   <foo>
   *     <bar>Item 1</bar>
   *     <bar>Item 2</bar>
   *     <baz>Another Item</baz>
   *   </foo>
   *   <foo>
   *     <bar>Item 3</bar>
   *   </foo>
   * </root>
   * 我们想要通过路径表达式 "foo.bar[1]" 查找第二个 <bar> 节点下的内容，即 "Item 2"。
   *
   * 首先，parseXFAPath("foo.bar[1]") 会返回一个类似于这样的路径数组：
   *
   * Javascript
   * [
   *   { name: "foo", pos: 0 },
   *   { name: "bar", pos: 1 }
   * ]
   * 然后调用 searchNode 方法：
   *
   * Javascript
   * let resultNode = root.searchNode([
   *   { name: "foo", pos: 0 },
   *   { name: "bar", pos: 1 }
   * ], 0);
   * 方法首先处理根节点 root，并将它作为当前节点 node。
   * 它会检查 node 是否有名为 foo 的子节点，并找到第一个 <foo> 节点。
   * 接着，方法会对 <foo> 节点递归调用自身，此时 pos 递增为 1。
   * 在新的 pos 下，方法会查找 <foo> 节点下名为 bar 且位置为 1（即第二个 <bar> 子节点）的节点。
   * 最终，方法会找到并返回包含 "Item 2" 的 <bar> 节点。
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
          for (const child of parent.children) {
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

  /**
   * 拼接出DOM字符串对应的数组。
   * buffer.join(''), 获得对应的字符串。
   * @param buffer
   */
  dump(buffer: string[]): void {
    // console.log('type-node dump . ');
    if (this.nodeName === '#text') {
      buffer.push(encodeToXmlString(this.nodeValue?.toString() || ''));
      return;
    }
    buffer.push(`<${this.nodeName}`);
    // 下面组装 属性 和 样式
    if (this.propObj?.attrObj) {
      for (let key in this.propObj.attrObj) {
        if (
          key !== 'viewBox' &&
          key !== 'spreadMethod' &&
          key !== 'gradientUnits'
        ) {
          key = humpToMiddleLine(key);
        }
        // todo
        buffer.push(
          ` ${key}="${encodeToXmlString(String(this.propObj.attrObj[key]))}"`
        );
      }
    }
    if (this.propObj?.styleObj) {
      let style = '';
      for (const key in this.propObj.styleObj) {
        style += `${humpToMiddleLine(key)}: ${encodeToXmlString(
          String((this.propObj.styleObj as any)[key])
        )};`;
      }
      if (style !== '') {
        buffer.push(` style="${style}"`);
      }
    }
    // todo this.attributes may be repeated with this.propObj.attrObj
    if (this.attributes) {
      for (const attribute of this.attributes) {
        buffer.push(
          ` ${attribute.name}="${encodeToXmlString(
            attribute.value.toString()
          )}"`
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
    } else if (this.nodeValue !== undefined) {
      buffer.push(
        `>${encodeToXmlString(this.nodeValue.toString())}</${this.nodeName}>`
      );
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
      className: this.className,
      nodeName: this.nodeName,
      nodeValue: this.nodeValue,
      attributes: this.attributes,
      childNodes: this.children.map((child) => {
        if (child.nodeName === '#text') {
          return {
            // className: 'TextNode',
            // nodeName: '#text',
            nodeValue: child.nodeValue // textContent
          };
        } else {
          return child.toJSON();
        }
      })
    } as ITypeNode;
  }
}
