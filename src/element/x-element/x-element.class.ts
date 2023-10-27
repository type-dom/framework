import { fromEvent } from 'rxjs';
import { INodeAttr, ITypeNode } from '../../type-node/type-node.interface';
import { TextNode } from '../../text-node/text-node.class';
import { TypeElement } from '../../type-element/type-element.abstract';
import { Parser } from '../../parser/parser.class';
import { IXElement } from './x-element.interface';
import { XNode } from '../../x-node/x-node.class';
/**
 * XElement是一个通用元素节点类，可以是其它类的父节点，也可以是其它类的子节点
 * DOM/XML
 * 不包括 文本节点类
 * 模板页面时用到，解析文本DOM。
 * 也要能转为 json 格式字符串或文本DOM。
 */
export class XElement extends TypeElement implements IXElement {
  className: 'XElement';
  nodeName: string;
  childNodes: (XElement | TextNode)[];
  parent?: TypeElement; // 在解析时，onEndElement时，重新赋值。
  template?: string;
  // data?: Record<string, any>;
  methods?: Record<string, Function>;
  config?: Record<string, any>; // config不会转为json
  dom?: HTMLElement | SVGElement;
  attributes: INodeAttr[];
  /**
   * 在 Parser 中使用 XElement 时， 限制了不能直接使用 parent 参数。
   * @param config
   */
  constructor(config: ITypeNode) {
    super();
    this.className = 'XElement';
    this.nodeName = config.nodeName || 'div';
    this.parent = config.parent || undefined;
    this.attributes = config.attributes || [];
    console.log('x-element . ');
    if (config.template !== undefined) {
      const parser = new Parser();
      const item = parser.parseFromString(config.template) as XElement;
      //   todo 绑定和指令等
      if (config.data) {
        console.log('config.data is ', config.data);
        item.data = config.data;
      }
      if (config.methods) {
        console.log('config.methods is ', config.methods);
        item.methods = config.methods;
      }
      this.parent?.addChild(item);
    }
    // todo template 和 childNodes 同时存在时怎么办  ？？？？？？
    this.childNodes = config.childNodes
      ?.map(child => {
        if (child.nodeValue !== undefined) {
          return new TextNode(child.nodeValue, this);
        } else {
          return new XElement({
            parent: this,
            nodeName: child.nodeName || 'div',
            childNodes: child.childNodes
          });
        }
      }) || [];
  }
  beforeRender(): void {
    console.log('XElement beforeRender . ');
    // todo nodejs下没有document，Parser可能会用到
    this.dom = document.createElement(this.nodeName);
    for (const attr of this.attributes) {
      if (attr.name.startsWith(':')) {
      //   绑定值
        console.log('attr.name is ', attr.name);
        const attrName = attr.name.substring(1);
        console.log('this.itemData is ', this.itemData);
        if (this.itemData && attr.value !== undefined) {
          const keys = attr.value.split('.');
          let value = this.itemData[keys[0]];
          if (value !== undefined) {
            for (let i = 1; i < keys.length; i++) {
              value = value[keys[i]];
            }
            if (value !== undefined) {
              this.addAttrObj({
                [attrName]: value,
              });
            }
          }
        }
      } else if (attr.name.startsWith('@')) {
      //   绑定事件
        console.log('attr.name is ', attr.name);
        console.log('attr.value is ', attr.value);
        const attrName = attr.name.substring(1);
        console.log('this.tempItem is ', this.tempItem);
        if (this.tempItem && attr.value !== undefined) {
          if (this.tempItem.methods && this.tempItem.methods[attr.value]) {
            if (this.dom !== undefined) {
              fromEvent(this.dom, attrName).subscribe((evt) => this.tempItem.methods[attr.value](evt, this));
            }
            // fromEvent(this.dom, 'input').subscribe((evt) => {
            //   console.log('input . ');
            //   console.log('this.dom is ', this.dom);
            //   console.log('this.dom.value is ', (this.dom as HTMLInputElement).value);
            //   console.log('evt is ', evt);
            //   this.setAttrObj({
            //     value: (this.dom as HTMLInputElement).value
            //   })
            // });
          }
        }
      } else {
        this.addAttrObj({
          [attr.name]: attr.value
        });
      }
    }
  }
}
