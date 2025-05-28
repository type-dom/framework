import { Parser } from '../../parser/parser.class';
import { TypeElement } from '../../core/type-element/type-element.abstract';
import type { IAttr } from '../../core/type-node/type-node.interface';
import { Style } from '../../core/style/style.class';
import { Attribute } from '../../core/attribute/attribute.class';
import { IXElement, XElementProps } from './x-element.interface';
import { isString } from '@type-dom/utils';
import { isVNode } from '../../utils';

/**
 * XElement是一个通用元素基础组件，是其它类组件的子节点,Html/Svg
 * DOM/XML
 * 不包括 文本节点类
 * 模板页面时用到，解析文本DOM。
 * 也要能转为 json 格式字符串或文本DOM。
 * 注：这其实也是一个特殊的组件
 */
export class XElement extends TypeElement implements IXElement {
  className: 'XElement';
  // parent?: XElement; // 在解析时，onEndElement时，重新赋值。
  // override childNodes: (XElement | TextNode)[];
  style: Style;
  attr: Attribute;
  // override template?: string;
  // data?: Record<string, any>;
  // override methods?: Record<string, any>;
  // config?: Record<string, any>; // config不会转为json
  override attributes: IAttr[]; // 去掉了?号；
  override dom?: HTMLElement | SVGElement;

  /**
   * 在 Parser 中使用 XElement 时， 限制了不能直接使用 parent 参数。
   * 加载自定义标签时也会用到；
   * @param params
   */
  constructor(params: XElementProps = {}) {
    super();
    this.className = 'XElement';
    this.assignProps({
      nodeName: params.tag || params.nodeName || 'div'
    });

    // this.useTag(params?.tag || params.nodeName)
    // console.log('x-element . ');
    this.attributes = params?.attributes || [];
    this.style = new Style(this);
    this.attr = new Attribute(this);
    if (isString(params?.template)) {
      const parser = new Parser();
      const item = parser.parseFromString(params.template) as XElement;
      //   todo 绑定和指令等
      // if (params.data) {
      //   console.log('params.data is ', params.data);
      //   item.data = reactive(params.data);
      // }
      if (params.methods) {
        // console.log('params.methods is ', params.methods);
        item.methods = params.methods;
      }
      // this.parent?.addChild(item); // this.parent is undefined
      this.addChild(item);
    } else if (isVNode(params.template)) {
      this.slotChildren(params.template);
    }
    // todo 报错 template 和 childNodes 同时存在时
    // this.childNodes =
    //   params?.items?.map((child) => {
    //     console.log('x-element child is ', child);
    //     if (child.nodeValue === undefined) {
    //       // if (child.TypeClass) {
    //       //   // todo 其它的类还要加载进来吗？
    //       //   return new child.TypeClass(child);
    //       // } else {
    //       // 解析json结构的子元素。
    //       return new XElement(child);
    //       // }
    //     } else {
    //       return new TextNode(child.nodeValue, this);
    //     }
    //   }) || [];
    this.props = this.useParams(params);
  }

  override setup(): void {
    // console.log('XElement setup . ');
    const props = this.props;
    this.slotChildren(props.slot || props.slots?.['default']);
    // todo nodejs下没有document，Parser可能会用到
    // 加载自定义属性
    for (const attr of this.attributes) {
      if (attr.name.startsWith(':')) {
        // 绑定值
        // console.log('attr.name is ', attr.name);
        // const attrName = attr.name.substring(1);
        // console.log('this.itemData is ', this.itemData);
        // if (this.itemData && attr.value !== undefined) {
        //   const keys = attr.value?.split('.');
        //   let value = this.itemData[keys[0]];
        //   if (value !== undefined) {
        //     for (let i = 1; i < keys.length; i++) {
        //       value = value[keys[i]];
        //     }
        //     if (value !== undefined) {
        //       this.attr.addObj({
        //         [attrName]: value
        //       });
        //     }
        //   }
        // }
      } else if (attr.name.startsWith('@')) {
        // 过滤掉，不加入属性中。专门绑定事件时处理。
      } else {
        this.attr?.addObj({
          [attr.name]: attr.value
        });
      }
    }

  }

  //   绑定事件
  // override mounted() {
  //   for (const attr of this.attributes) {
  //     if (attr.name.startsWith('@')) {
  //       console.log('attr.name is ', attr.name);
  //       console.log('attr.value is ', attr.value);
  //       // const attrName = attr.name.substring(1);
  //       // console.log('this.itemMethods is ', this.itemMethods);
  //       // if (this.itemMethods !== undefined && attr.value !== undefined) {
  //       //   if (this.itemMethods[attr.value]) {
  //       //     if (this.dom === undefined) {
  //       //       throw Error('this.dom is undefined . ');
  //       //     } else {
  //       //       this.addEvents({
  //       //         [attrName]: (evt: Event) => {
  //       //           if (
  //       //             this.itemMethods !== undefined &&
  //       //             this.itemMethods[attr.value] !== undefined
  //       //           ) {
  //       //             this.itemMethods[attr.value](evt, this);
  //       //           }
  //       //         }
  //       //       });
  //       //     }
  //       //   }
  //       // }
  //     }
  //   }
  // }
}
