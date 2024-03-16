import { TypeNode } from '../type-node/type-node.abstract';
import type { INodeAttr } from '../type-node/type-node.interface';
import type { IXNode } from './x-node.interface';

/**
 * 只有 type-node-parser 解析时用到，
 * 不要与自定义类混合使用
 */
export class XNode extends TypeNode implements IXNode {
  className: 'XNode';
  parent: undefined;
  nodeName?: string;
  nodeValue?: string;
  override attributes: INodeAttr[] = [];
  childNodes?: XNode[];
  // 只有渲染后才会生成真实dom
  dom?: HTMLElement | SVGElement | Text;
  parentNode?: XNode | null;

  constructor(option: IXNode) {
    super();
    this.className = 'XNode';
    this.nodeName = option.nodeName;
    this.nodeValue = option.nodeValue;
    this.parent = undefined;
    // if (option.nodeValue !== undefined) {
    //   this.dom = document.createTextNode(option.nodeValue);
    // } else {
    //   this.dom = document.createElement(option.nodeName || 'div');
    // }
    // this.childNodes = option.childNodes as TypeNode[];
    this.childNodes = option.childNodes?.map((child) => {
      // child.parent = this as XNode;
      return new XNode(child);
    });
  }

  createItem(parent: XNode, node: IXNode): XNode {
    // node.parent = parent;
    return new XNode(node);
  }

  render(): void {
    // const dom = document.createElement(this.nodeName);
    // const textNode = document.createTextNode(this.nodeValue);
    if (this.nodeValue !== undefined) {
      this.dom = document.createTextNode(this.nodeValue);
    } else if (this.nodeName !== undefined) {
      this.dom = document.createElement(this.nodeName);
      if (this.childNodes !== undefined) {
        this.childNodes = this.childNodes.map((child) => {
          console.log('child is ', child);
          child.render();
          if (child.dom) {
            this.dom?.appendChild(child.dom);
          }
          return child;
        });
      }
    }
  }
}
