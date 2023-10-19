import { fromEvent } from 'rxjs';
import { INodeAttr } from '../../type-node/type-node.interface';
import { TypeElement } from '../../type-element/type-element.abstract';
import { IXElement, IXElementOption } from './x-element.interface';
import { Parser } from '../../parser/parser.class';
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
  parent: TypeElement; // 在解析时，onEndElement时，重新赋值。
  template?: string;
  // data?: Record<string, any>;
  methods?: Record<string, Function>;
  config?: Record<string, any>; // config不会转为json
  dom: HTMLElement | SVGElement;
  attributes: INodeAttr[];
  constructor(option: IXElementOption) {
    super();
    this.className = 'XElement';
    this.nodeName = option.nodeName || 'div';
    // todo nodejs下没有document，Parser可能会用到
    this.dom = document.createElement(this.nodeName);
    this.parent = option.parent || this;
    this.attributes = [];
    console.log('x-element . ');
    if (option.template !== undefined) {
      const parser = new Parser();
      const item = parser.parseFromString(option.template) as XElement;
      //   todo 绑定和指令等
      if (option.data) {
        console.log('option.data is ', option.data);
        item.data = option.data;
      }
      if (option.methods) {
        console.log('option.methods is ', option.methods);
        item.methods = option.methods;
      }
      this.parent.addChild(item);
    }
    // todo template 和 childNodes 同时存在时怎么办  ？？？？？？
    // if (option.childNodes) {
    //   if (item.childNodes !== undefined) {
    //     if (item instanceof TypeElement) {
    //       item.childNodes = item.createItems(item, node.childNodes);
    //     } else {
    //       throw Error('item is TextNode , do not have childNodes . ');
    //     }
    //   } else {
    //     throw Error('TypeClass is TextNode, but has childNodes . ');
    //   }
    // }
  }
  beforeRender(): void {
    console.log('XElement beforeRender . ');
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
            fromEvent(this.dom, attrName).subscribe((evt) => this.tempItem.methods[attr.value](evt, this));
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
