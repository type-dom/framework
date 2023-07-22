import { INodeAttr } from '../../type-node/type-node.interface';
import { TypeElement } from '../../type-element/type-element.abstract';
import { IXElement } from './x-element.interface';
/**
 * XElement是一个通用元素节点类，可以是其它类的父节点，也可以是其它类的子节点
 * DOM/XML
 * 不包括 文本节点类
 * 模板页面时用到，解析文本DOM。
 * 也要能转为 json 格式字符串或文本DOM。
 */
export class XElement extends TypeElement implements IXElement {
  className: 'XElement';
  parent: TypeElement; // 在解析时，onEndElement时，重新赋值。
  dom: HTMLElement | SVGElement;
  attributes: INodeAttr[];
  constructor(nodeName = 'div', parent?: TypeElement) {
    super(nodeName);
    this.className = 'XElement';
    this.dom = document.createElement(this.nodeName);
    this.parent = parent || this;
    this.attributes = [];
  }
  beforeRender(): void {
    console.log('XElement beforeRender . ');
    for (const attr of this.attributes) {
      if (attr.name.startsWith(':')) {
      //   绑定值
        console.log('attr.name is ', attr.name);
        const attrName = attr.name.substring(1);
        console.log('this.itemData is ', this.itemData);
        if (this.itemData && this.itemData[attr.value]) {
          const value = this.itemData[attr.value];
          this.addAttrObj({
            [attrName]: value,
          })
        }
      } else if (attr.name.startsWith('@')) {
      //   绑定事件

      } else {
        this.addAttrObj({
          [attr.name]: attr.value
        })
      }

    }
  }
}
