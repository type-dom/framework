import type { ITypeAttribute } from '../type-element/type-element.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { IStyle } from '../style/style.interface';
import { TextNode } from '../text-node/text-node.class';
import { TypeNode } from './type-node.abstract';
import { IJsonData, type IJsonDataProp, IObData } from '../../interface';
import { UnwrapNestedRefs } from '../reactivity/reactive';
import { Subscription } from 'rxjs';

export interface IAttr {
  name: string;
  value: string; // | number | boolean; // | undefined | unknown;
}

export interface IAttrID extends IAttr {
  name: 'id';
  // value: string | number;
}
export interface IAttrClass extends IAttr {
  name: 'class';
  // value: string | number;
}
export interface IAttrStyle extends IAttr {
  name: 'style';
  // value: Partial<IStyle>;
}
export interface IAttrName extends IAttr {
  name: 'name';
  // value: string | number;
}
export interface IAttrType extends IAttr {
  name: 'type';
  // value: string | number;
}
export interface IAttrValue extends IAttr {
  name: 'value';
  // value: string | number;
}

export interface IPath {
  name: string;
  pos: number;
}

/**
 * TypeDom 最基础的接口，所有节点都实现了这个接口。
 * 这个接口定义了节点的基本属性，如：
 * 1. 节点类名
 * 2. 节点属性数组  数组形式的属性名和值，如：[{name: 'id', value: '123'}, {name: 'class', value: 'active'}]，解析dom字符串时，会将属性名和值分开。
 * 3. 节点值
 * 4. 节点类型
 * 5. 父节点
 * 6. 节点属性对象 (除了style对应的属性之外的其他属性) 要挂载到DOM的属性上的
 * 7. 节点样式对象
 * 8. 子节点数组
 * 9. 节点模板
 * 10. 节点数据
 * 11. 节点方法
 * 12. 节点配置
 *
 * 同时可以对应json格式的接口，也是json存储的数据结构（除去parent/TypeClass）
 */
export interface ITypeNode {
  className?: string;
  attributes?: IAttr[];
  nodeName?: string;
  /**
   * nodeValue只在 TextNode中才有。
   * nodeValue存在时，就应该是 TextNode类
   */
  nodeValue?: string | undefined;

  /**
   * parent 可选
   * 且为 TypeElement
   * XNode 如何处理 ———————— 不设 parent， === undefined
   */
  parent?: TypeElement;
  /**
   * 上下文，用于查找上下文。
   * 对应于创建该对象的类对象。
   * 在setConfig时，对所有子对象进行设置。
   */
  context?: TypeNode;
  /**
   * 节点类型
   * 是否根节点；
   * root()方法返回的节点，就是根节点。
   */
  isRoot?: boolean; // 是否是根节点 一般TypeRoot才为true，其他为false。也可以自定义。
  /**
   * 属性对象，除了style对应的属性之外的其他属性。
   */
  attrObj?: Partial<ITypeAttribute>;
  /**
   * 样式对象。
   */
  styleObj?: Partial<IStyle>;
  /**
   * 绑定的事件集合,转化为 subscriptions;
   * 在构造函数中设置；
   * 与 addEvents方法配合；
   * initEvents 钩子 调用
   */
  events?: Partial<IEvents>;
  subscriptions?: Subscription[];
  // TextNode 没有 childNodes
  childNodes?: ITypeNode[];
  /**
   * 属性值必须用 ' 或 " 包起来
   * 标签必须闭合， 如 <input /> 这样才能闭合。
   */
  template?: string; // 模板 默认TypeClass为XElement
  data?: UnwrapNestedRefs<IObData>; // 数据  ITypeConfig 需要继承
  // 绑定的事件集合, TypeElement 才有
  // 生成json时，subscriptions；
  // 反向转为类时，要转为subscriptions的值
  methods?: IMethods;
  settings?: ISettings; // config不会转为json
  // type?: string;
}

export interface IMethods {
  [propName: string]: (...args: any[]) => void;
}

export interface IXData {
  [propName: string]: string | number | boolean | undefined | IXData | IXData[];
}

export interface IOptionSet extends IXData{
  label: string,
  value: string | number | boolean,
  checked?: boolean, // radio checkbox
  selected?: boolean, // select
  options?: IOptionSet[]
}

export type ISetting = string | number | boolean | ISettings | IOptionSet[] | undefined;

export interface ISettings extends IXData{
  // fieldSetting?: IOptionSetting;
  [key: string]: ISetting;
}

export interface IOptionSetting extends ISettings {
  name: string;
  // selectedOption: string | number | boolean,
  // 在级联控件中，resultValue应该是带 . 的值，是不同层级值拼接出来的。
  resultValue: string | number | boolean; // 不应该根据这个排队选中后的值，因为有可能是多选。
  options: IOptionSet[];
}

export interface IEvents {
  abort: (evt?: Event, element?: TypeElement) => void;
  blur: (evt?: Event, element?: TypeElement) => void;
  change: (evt?: Event, element?: TypeElement) => void; // newValue = evt.target.value
  click: (evt?: Event, element?: TypeElement) => void;
  // canplay: (evt?: Event, element?: TypeElement) => void;
  // canplaythrough: (evt?: Event, element?: TypeElement) => void;
  compositionstart: (evt?: Event, element?: TypeElement) => void;
  compositionupdate: (evt?: Event, element?: TypeElement) => void;
  compositionend: (evt?: Event, element?: TypeElement) => void;
  // durationchange: (evt?: Event, element?: TypeElement) => void;
  // emptied: (evt?: Event, element?: TypeElement) => void;
  // ended: (evt?: Event, element?: TypeElement) => void;
  focus: (evt?: Event, element?: TypeElement) => void;
  dblclick: (evt?: Event, element?: TypeElement) => void;
  // contextmenu: (evt?: Event, element?: TypeElement) => void;
  drag: (evt?: Event, element?: TypeElement) => void;
  dragend: (evt?: Event, element?: TypeElement) => void;
  dragenter: (evt?: Event, element?: TypeElement) => void;
  // dragexit: (evt?: Event, element?: TypeElement) => void;
  dragleave: (evt?: Event, element?: TypeElement) => void;
  dragover: (evt?: Event, element?: TypeElement) => void;
  dragstart: (evt?: Event, element?: TypeElement) => void;
  drop: (evt?: Event, element?: TypeElement) => void;
  input: (evt?: Event, element?: TypeElement) => void;
  // inputenter: (evt?: InputEvent, element?: TypeElement) => void;
  // invalid: (evt?: Event, element?: TypeElement) => void;
  keydown: (evt?: Event, element?: TypeElement) => void;
  keyup: (evt?: Event, element?: TypeElement) => void;
  keypress: (evt?: Event, element?: TypeElement) => void;
  // keypressenter: (evt?: Event, element?: TypeElement) => void;
  load: (evt?: Event, element?: TypeElement) => void;
  // loadeddata: (evt?: Event, element?: TypeElement) => void;
  // loadedmetadata: (evt?: Event, element?: TypeElement) => void;
  // loadstart: (evt?: Event, element?: TypeElement) => void;
  mousedown: (evt?: Event, element?: TypeElement) => void;
  mouseenter: (evt?: Event, element?: TypeElement) => void;
  mouseleave: (evt?: Event, element?: TypeElement) => void;
  mousemove: (evt?: Event, element?: TypeElement) => void;
  mouseout: (evt?: Event, element?: TypeElement) => void;
  mouseover: (evt?: Event, element?: TypeElement) => void;
  mouseup: (evt?: Event, element?: TypeElement) => void;
  mousewheel: (evt?: Event, element?: TypeElement) => void;
  // mspointerdown: (evt?: Event, element?: TypeElement) => void;
  // mspointermove: (evt?: Event, element?: TypeElement) => void;
  // mspointerup: (evt?: Event, element?: TypeElement) => void;
  // pointerdown: (evt?: Event, element?: TypeElement) => void;
  // pointermove: (evt?: Event, element?: TypeElement) => void;
  // pointerup: (evt?: Event, element?: TypeElement) => void;
  // pointercancel: (evt?: Event, element?: TypeElement) => void;
  // pointerover: (evt?: Event, element?: TypeElement) => void;
  // pointerout: (evt?: Event, element?: TypeElement) => void;
  // pointerenter: (evt?: Event, element?: TypeElement) => void;
  // pointerleave: (evt?: Event, element?: TypeElement) => void;
  select: (evt?: Event, element?: TypeElement) => void;
  touchcancel: (evt?: Event, element?: TypeElement) => void;
  touchend: (evt?: Event, element?: TypeElement) => void;
  touchmove: (evt?: Event, element?: TypeElement) => void;
  touchstart: (evt?: Event, element?: TypeElement) => void;
  // touchevent: (evt?: Event, element?: TypeElement) => void;
  // wheel: (evt?: Event, element?: TypeElement) => void;
  scroll: (evt?: Event, element?: TypeElement) => void;
}

// 参数为 ITypeConfig
export interface ITypeConfig extends ITypeNode {
  name?: string;
  text?: string; // 只是简单的添加一个文本节点时用，
  // todo 可能是类实例对象；也可能是json对象；
  childNodes?: (TypeElement | TextNode)[];
  // 设置子元素的属性，并根据属性创建子元素；
  items?: ITypeConfig[];
  // 事件集合，key为事件名，value为回调函数
  events?: Partial<IEvents>
}

export interface IOptionConfig extends ITypeConfig {
  label: string,
  value: string,
  checked?: boolean,
}

export interface INodeHandler<T extends ITypeNode> {
  /**
   * Handle the 'get' operation on the target object.
   * @param target The original object wrapped by the XProxy instance.
   * @param prop The name or Symbol of the property to get.
   * @param receiver
   * @returns The returned value after applying custom logic.
   */
  get?(target: T, prop: string, receiver?: (...rest: string[]) => void): IJsonDataProp;

  /**
   * Handle the 'set' operation on the target object.
   * @param target The original object wrapped by the XProxy instance.
   * @param prop The name or Symbol of the property to set.
   * @param value The new value to assign to the property.
   * @param receiver
   * @returns A Boolean indicating whether the set operation was successful.
   */
  set?(target: T, prop: string, value: IJsonDataProp, receiver?: (...rest: string[])=> void): boolean;

  /**
   * Handle the 'has' operation on the target object.
   * @param target
   * @param prop
   */
  deleteProperty?(target: T, prop: string): void;
}
