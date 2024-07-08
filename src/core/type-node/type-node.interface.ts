import { Subscription } from 'rxjs';
import { IStyle } from '@type-dom/css-type';
import { type IJsonDataProp, IJsonData, IObData } from '../../interface';
import { UnwrapNestedRefs } from '../../reactivity/reactive';
import { XProxy } from '../../observer';
import { IEvents, ITransitionConfig } from '../../events/events.interface';
import type { ITypeAttribute } from '../type-element/type-element.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { TextNode } from '../text-node/text-node.class';
import { TypeNode } from './type-node.abstract';

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
  nodeValue?: string | number | undefined;

  /**
   * 移动到 DOM 中 app 之外的其他位置的方式。
   * 该节点不是当前位置的组件的子节点；要避免加入到组件的子节点中；要挂载到指定的组件的DOM,甚至直接指向 body；
   */
  to?: HTMLElement;

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
  attrObj?: ITypeAttribute;
  /**
   * 样式对象。
   */
  styleObj?: IStyle;
  /**
   * 绑定的事件集合,转化为 subscriptions;
   * 一般在构造函数的参数（config）中传入；
   * 与 addEvents方法配合；
   * initEvents 钩子 调用
   */
  events?: Partial<IEvents>;
  subscriptions?: Subscription[];
  // TextNode 肯定没有 childNodes， Element 可以没有 childNodes;
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

export interface IOptionSet extends IXData {
  label: string;
  value: string | number | boolean;
  checked?: boolean; // radio checkbox
  selected?: boolean; // select
  options?: IOptionSet[];
}

export type ISetting =
  | string
  | number
  | boolean
  | ISettings
  | IOptionSet[]
  | undefined;

export interface ISettings extends IXData {
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

// 参数接口
export interface ITypeConfig extends ITypeNode {
  name?: string; // 节点名称, 转化为 attrObj.name;
  // 当前对象引用
  ref?: XProxy<IJsonData>;
  text?: string | number | XProxy<IJsonData>; // 只是简单的添加一个文本节点时用，
  // 类实例对象；  与 ITypeNode 中的 childNodes: ITypeNode[]
  childNodes?: (TypeElement | TextNode)[];
  // 设置子元素的属性，并根据属性创建子元素；是json对象；指定的元素类型；
  items?: ITypeConfig[];
  // 多个插槽 ———— 对应的 是 TypeNode | TypeNode[], 不同于一般的属性；需要组件本身单独处理的。setConfig方法中没有默认处理方法；
  slots?: Record<string, TypeNode | TypeNode[]>; // 指定多个不同位置的插槽，需要有插槽名称的；需要在类中添加插槽的位置；
  // 默认插槽
  slot?: TypeNode | TypeNode[]; // OnlyChild 默认位置的插槽, 可以是单个元素，也可以是多个元素，即数组；如何直接插入当前元素，则相当与 childNodes属性；

  transitionConfig?: ITransitionConfig,
}

export interface IOptionConfig extends ITypeConfig {
  label: string;
  value: string;
  checked?: boolean;
}

export interface INodeHandler<T extends ITypeNode> {
  /**
   * Handle the 'get' operation on the target object.
   * @param target The original object wrapped by the XProxy instance.
   * @param prop The name or Symbol of the property to get.
   * @param receiver
   * @returns The returned value after applying custom logic.
   */
  get?(
    target: T,
    prop: string,
    receiver?: (...rest: string[]) => void
  ): IJsonDataProp;

  /**
   * Handle the 'set' operation on the target object.
   * @param target The original object wrapped by the XProxy instance.
   * @param prop The name or Symbol of the property to set.
   * @param value The new value to assign to the property.
   * @param receiver
   * @returns A Boolean indicating whether the set operation was successful.
   */
  set?(
    target: T,
    prop: string,
    value: IJsonDataProp,
    receiver?: (...rest: string[]) => void
  ): boolean;

  /**
   * Handle the 'has' operation on the target object.
   * @param target
   * @param prop
   */
  deleteProperty?(target: T, prop: string): void;
}
