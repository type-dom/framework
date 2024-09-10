import { Subscription } from 'rxjs';
import { IStyle } from '@type-dom/css-type';
import { type IJsonDataProp, IJsonData, IObData, AnyFn } from '../../interface';
import { Ref } from '../../reactivity/ref';
import { XProxy } from '../../observer';
import { IEmits, IEvents } from '../../events/events.interface';
import { SlotNode } from '../../components/slot-node/slot-node.class';
import type { ITypeAttribute } from '../type-element/type-element.interface';
import { TypeNode } from './type-node.abstract';
import { ITypeBase } from './type-base.interface';

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
export interface ITypeNode extends  ITypeBase {
  params?: ITypeConfig | undefined; // 传入参数, ITypeConfig 中是undefined
  // emits?: IEmits; //
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
export interface ITypeConfig extends ITypeBase {
  name?: string | number; // 节点名称, 转化为 attrObj.name;
  // 当前对象引用
  ref?: XProxy<IJsonData> |  Ref<any>;
  text?: boolean | string | number | XProxy<IJsonData>; // 只是简单的添加一个文本节点时用，
  /**
   * 属性对象，除了style对应的属性之外的其他属性。
   */
  attrObj?: ITypeAttribute | undefined;
  /**
   * 样式对象。
   */
  styleObj?: IStyle | undefined;
  // 类实例对象；  与 ITypeNode 中的 childNodes: ITypeNode[] 与ITypeNode 中的 childNodes: ITypeNode[] 不同；
  childNodes?: TypeNode[] | undefined; // todo 象slot一样字符串、数字类型等。

  // 设置子元素的属性，并根据属性创建子元素；是json对象；指定的元素类型；
  items?: ITypeConfig[];
  // 多个插槽 ———— 对应的 是 TypeNode | TypeNode[], 不同于一般的属性；需要组件本身单独处理的。setConfig方法中没有默认处理方法；
  slots?: IConfigSlots; // 指定多个不同位置的插槽，需要有插槽名称的；需要在类中添加插槽的位置；
  // 默认插槽  同 slots.default  组件没有插槽时，为undefined。这时子元素只能用 childNodes 属性；
  slot?: IConfigSlot; // OnlyChild 默认位置的插槽, 可以是单个元素，也可以是多个元素，即数组；如何直接插入当前元素，则相当与 childNodes属性；
  html?: string;
  /**
   * 自定义的事件监听器，与 events 不同，events 是绑定在元素上的事件，而 emits 是在元素上触发的事件；
   * 与 addEmits 方法配合；
   * emit 方法 触发时，会调用挂载的方法；
   */
  emits?: IEmits;
  /**
   * 绑定的事件集合,转化为 Subscription; fromEvent
   * 一般在构造函数的参数（params）中传入；
   * 与 addEvents方法配合；
   * initEvents 钩子 调用
   */
  events?: Partial<IEvents>;
  /**
   * 属性值必须用 ' 或 " 包起来
   * 标签必须闭合， 如 <input /> 这样才能闭合。
   */
  template?: string; // 模板 默认TypeClass为XElement
  fieldSetting?: IOptionSetting;
  [propName: string]: any;
}

export interface ISlotNodes {
  [propName: string]: SlotNode | undefined;
}

export type IConfigSlot = string | TypeNode | (string | TypeNode)[] | undefined;

export interface IConfigSlots {
  [propName: 'default' | string]: IConfigSlot;
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
