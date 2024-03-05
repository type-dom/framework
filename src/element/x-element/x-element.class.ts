import { fromEvent } from 'rxjs';
import type { INodeAttr, ITypeNode } from '../../type-node/type-node.interface';
import { TextNode } from '../../text-node/text-node.class';
import { TypeElement } from '../../type-element/type-element.abstract';
import { Parser } from '../../parser/parser.class';
import type { IXElement } from './x-element.interface';

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
  parent?: TypeElement; // 在解析时，onEndElement时，重新赋值。
  declare childNodes: (XElement | TextNode)[];
  declare template?: string;
  // data?: Record<string, any>;
  declare methods?: Record<string, any>;
  config?: Record<string, any>; // config不会转为json
  dom?: HTMLElement | SVGElement;
  declare attributes: INodeAttr[];

  /**
   * 在 Parser 中使用 XElement 时， 限制了不能直接使用 parent 参数。
   * @param config
   */
  constructor(config: ITypeNode = {}) {
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
    // template 和 childNodes 同时存在时
    this.childNodes =
      config.childNodes?.map((child) => {
        if (child.nodeValue !== undefined) {
          return new TextNode(child.nodeValue, this);
        } else {
          if (child.TypeClass) {
            return new child.TypeClass(child);
          } else {
            return new XElement({
              parent: this,
              nodeName: child.nodeName,
              childNodes: child.childNodes,
            });
          }
        }
      }) || [];
  }

  override beforeRender(): void {
    console.log('XElement beforeRender . ');
    // todo nodejs下没有document，Parser可能会用到
    if (!this.dom) {
      this.dom = document.createElement(this.nodeName);
    }
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
        // 过滤掉，不加入属性中。专门绑定事件时处理。
      } else {
        this.addAttrObj({
          [attr.name]: attr.value,
        });
      }
    }
  }

  //   绑定事件
  initEvents() {
    for (const attr of this.attributes) {
      if (attr.name.startsWith('@')) {
        console.log('attr.name is ', attr.name);
        console.log('attr.value is ', attr.value);
        const attrName = attr.name.substring(1);
        console.log('this.itemMethods is ', this.itemMethods);
        if (this.itemMethods !== undefined && attr.value !== undefined) {
          if (this.itemMethods[attr.value]) {
            if (this.dom !== undefined) {
              this.events.push(
                // events数组方式方便卸载
                fromEvent(this.dom, attrName).subscribe((evt) => {
                  // todo 没有下面的if，则报错 TS2532: Object is possibly undefined
                  if (
                    this.itemMethods !== undefined &&
                    this.itemMethods[attr.value] !== undefined
                  ) {
                    this.itemMethods[attr.value](evt, this);
                  }
                })
              );
            } else {
              throw Error('this.dom is undefined . ');
            }
          }
        }
      }
    }
  }
}
