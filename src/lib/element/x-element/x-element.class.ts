import { fromEvent } from 'rxjs';
import type { INodeAttr } from '../../type-node/type-node.interface';
import { TextNode } from '../../text-node/text-node.class';
import { Parser } from '../../parser/parser.class';
import { TypeElement } from '../../type-element/type-element.abstract';
import { IXElement } from './x-element.interface';
// import { ITypeConfig } from '../../config.interface';

/**
 * XElement是一个通用元素基础组件，是其它类组件的子节点
 * DOM/XML
 * 不包括 文本节点类
 * 模板页面时用到，解析文本DOM。
 * 也要能转为 json 格式字符串或文本DOM。
 * 注：这其实也是一个特殊的组件
 */
export class XElement extends TypeElement implements IXElement {
  className: 'XElement';
  nodeName: string;
  // parent?: XElement; // 在解析时，onEndElement时，重新赋值。
  override childNodes: (XElement | TextNode)[];
  // override template?: string;
  // data?: Record<string, any>;
  // override methods?: Record<string, any>;
  // config?: Record<string, any>; // config不会转为json
  override attributes: INodeAttr[]; // 去掉了?号；
  dom?: HTMLElement | SVGElement;

  /**
   * 在 Parser 中使用 XElement 时， 限制了不能直接使用 parent 参数。
   * 加载自定义标签时也会用到；
   * @param config
   */
  constructor(config?: Partial<IXElement>) {
    super();
    this.className = 'XElement';
    this.nodeName = config?.nodeName || 'div';
    this.parent = config?.parent || undefined;
    this.attributes = config?.attributes || [];
    console.log('x-element . ');
    if (config?.template !== undefined) {
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
    // todo 报错 template 和 childNodes 同时存在时
    this.childNodes =
      config?.childNodes?.map((child) => {
        console.log('x-element child is ', child);
        if (child.nodeValue !== undefined) {
          return new TextNode(child.nodeValue, this);
        } else {
          // if (child.TypeClass) {
          //   // todo 其它的类还要加载进来吗？
          //   return new child.TypeClass(child);
          // } else {
          // 解析json结构的子元素。
          return new XElement(child as IXElement);
          // }
        }
      }) || [];
  }

  override beforeRender(): void {
    console.log('XElement beforeRender . ');
    // todo nodejs下没有document，Parser可能会用到
    if (!this.dom) {
      this.dom = document.createElement(this.nodeName);
    }
    // 加载自定义属性
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
  override initEvents() {
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
