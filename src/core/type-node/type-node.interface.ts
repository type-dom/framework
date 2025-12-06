import { Dayjs } from 'dayjs';
import { Computed, Signal } from '@type-dom/signals';
import { AnyFn, IPrimitive } from '@type-dom/utils';
import { MaybeRef, Ref } from '../../reactivity';
import { type IJsonDataProp } from '../../interface';
import { StyleValue } from '../../dom/modules/style/style.interface';
import { Attributes, ClassValue } from '../../dom/modules/attribute/attribute.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { IEmits } from '../event-emitter/event-emitter.interface';
import { TransitionElement, TransitionHooks } from '../components/type-transition/type-transition.interface';
import { NodeName } from '../enums';
import { TypeNode } from './type-node.abstract';
import { ITypeBase } from './type-base.interface';

export interface IAttr {
  name: string;
  value: string | number; // | boolean; // | undefined | unknown;
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
  // value: Partial<CSSProperties>;
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

// type Data = Record<string, unknown>

/**
 * 这个接口定义了节点的基本属性，如：
 * 1.  节点类名
 * 2.  节点属性数组  数组形式的属性名和值，如：[{name: 'id', value: '123'}, {name: 'class', value: 'active'}]，解析dom字符串时，会将属性名和值分开。
 * 3.  节点值
 * 4.  节点类型
 * 5.  父节点
 * 6.  节点属性对象 (除了style对应的属性之外的其他属性) 要挂载到DOM的属性上的
 * 7.  节点样式对象
 * 8.  子节点数组
 * 9.  节点模板
 * 10. 节点数据
 * 11. 节点方法
 * 12. 节点配置
 *
 * 同时可以对应json格式的接口，也是json存储的数据结构（除去parent/TypeClass）
 */
export interface ITypeNode extends ITypeBase {
  className?: string;
  uid?: number; // 自增id uid: uid++
  params?: TypeProps; // 传入参数, TypeProps 中是undefined
  createdIn?: 'setup'; //  constructor
  transition?: TransitionHooks<TransitionElement>;
}

export interface IMethods {
  [propName: string]: (...args: any[]) => any;
}

export type IXDataItem = string | number | boolean | undefined | IXData | IXData[];

export interface IXData {
  [propName: string]: IXDataItem;
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

export interface IPropsSetting {
  [propName: string]: IPropSetting;
}

export interface IPropSetting {
  type: string;
  values?: string | number | boolean | string[];
  default?: string | number | boolean;
}

// 参数接口
export interface TypeProps extends ITypeBase {
  name?: string | number; // 节点名称, 转化为 attrObj.name;
  tag?: keyof HTMLElementTagNameMap | NodeName.FRAGMENT | NodeName.TEXT | string; // 转为 nodeName
  nodeName?: keyof HTMLElementTagNameMap | NodeName.FRAGMENT | NodeName.TEXT | string;
  config?: any; // 全局配置属性；
  /**
   * nodeValue只在 TextNode中才有。
   * nodeValue存在时，就应该是 TextNode类
   */
  nodeValue?: string | number | undefined;

  /**
   * 是否禁用，默认为 false，如果为 true。
   */
  disabled?: MaybeRef<boolean | undefined>;

  modelValue?: IPrimitive | object | (IPrimitive | object)[];
  // 双向绑定的就应该是 Signal<IPrimitive | object> 类型；与 modelValue 联合使用
  vModel?:  Ref<IPrimitive | object | (IPrimitive | object)[]>;
  value?: any;
  /**
   * 是否创建dom，默认为 true，如果为 false，则不挂载到dom树中。
   * 监听到值变化时，触发更新，重新处理 dom 树。
   * 注：undefined时，到底是否加载dom？？？？
   */
  vIf?: MaybeRef<boolean | unknown>;
  /**
   * 是否显示，默认为 true，显示dom，display：block | flex 等;如果为 false，则不显示dom，display: none。
   * 监听值变化，触发更新，重新设置display的值。需要保留初始样式中的display。或者直接移除display；
   */
  vShow?: MaybeRef<boolean | unknown>;
  /**
   * 绑定的class对象，用于获取当前对象的class；
   *  与 ns 方法配合使用，获取当前对象的class；
   *  样式 theme 中的样式，需要通过 class 绑定；
   *  [ class ] 样式叠加， class 样式替换；
   */
  class?: ClassValue; // <string[]>;
  /**
   * 绑定的ref对象，用于获取当前对象的dom元素；
   * 注： 绑定外部对象引用；根据绑定的组件是基础组件还是高级组件，判断是绑定组件还是绑定组件的dom
   */
  // ref?: MaybeRef<Element | DocumentFragment | TypeElement | undefined>;
  /**
   * 绑定的组件的引用对象，用于获取当前组件；
   */
  refEl?: Ref<TypeNode | undefined>
  /**
   * 绑定的组件的引用对象，用于获取当前组件的dom元素；
   * 与anchor无关
   */
  refDom?: Ref<Element | DocumentFragment | undefined>;
  refs?: Record<string, Element>;
  ref?: string;
  /**
   * 绑定的refId对象，用于父级查找到当前对象；
   */
  refId?: string | number;
  /**
   * 属性对象，除了style对应的属性之外的其他属性。
   */
  attrObj?: Attributes;
  /**
   * 样式对象。
   */
  styleObj?: StyleValue;
  // 类实例对象；  与 ITypeNode 中的 childNodes: ITypeNode[] 与ITypeNode 中的 childNodes: ITypeNode[] 不同；
  // childNodes?: TypeNode[] | undefined; // todo 象slot一样字符串、数字类型等。

  // 设置子元素的属性，并根据属性创建子元素；是json对象；指定的元素类型；
  items?: TypeProps[];
  // 多个插槽 ———— 对应的 是 TypeNode | TypeNode[], 不同于一般的属性；需要组件本身单独处理的。setConfig方法中没有默认处理方法；
  slots?: ISlots; // 指定多个不同位置的插槽，需要有插槽名称的；需要在类中添加插槽的位置；
  // 默认插槽  同 slots.default  组件没有插槽时，为undefined。这时子元素只能用 childNodes 属性；
  //  可以是单个元素，也可以是多个元素，即数组；如何直接插入当前元素，则直接添加到 childNodes；
  slot?: ISlotItem;
  // todo slot可以是方法， init方法可以没有
  init?: (element: TypeElement) => void;
  /**
   * 自定义的事件监听器，与 events 不同，events 是绑定在基础组件上的事件，而 emits 是在自定义组件上的事件；
   * 与 addEmits 方法配合；
   * emit 方法 触发时，会调用挂载的方法；
   */
  emits?: IEmits | string[];
  /**
   * 绑定的事件集合,转化为 Subscription; fromEvent
   * 一般在构造函数的参数（params）中传入；
   * 与 addEvents方法配合；
   * initEvents 钩子 调用
   */
  // events?: Partial<IEvents>;
  /**
   * 属性值必须用 ' 或 " 包起来
   * 标签必须闭合， 如 <input /> 这样才能闭合。
   */
  template?: string; // 模板 默认TypeClass为XElement
  html?: MaybeRef<string>;
  fieldSetting?: IOptionSetting;

  // data?: UnwrapNestedRefs<IObData>; // 数据  TypeProps 需要继承
  // 绑定的方法集合
  methods?: IMethods;
  // todo defaultOptions
  defaults?: ISettings; // 同 Extjs 中的defaults
  // type?: string;
  /**
   * The other props of the element.
   */
  [dataKey: `data-${string}`]: unknown;
  // [dataKey: `data-${string}` | `on${string}` | `td-${string}`]: unknown;
  [modifier: `${Uncapitalize<string>}Modifiers`]: Record<string, boolean> | undefined;
  [key: `on${Capitalize<string>}`]: AnyFn | AnyFn[] | undefined;
  // sourceWrapper?:  string | XProxy<IJsonData>;
  // showcase?:  TypeElement[];
  // width?: number | string;
  // route?: RouteRecordRaw,
  // router?: Router;
  // visibilityHeight?: string | number;
  // arrowOffset?: string | number;
  // callback?: (...args: any[]) => void;
  // parent?: TypeElement;
  // [propName: string]: any; // todo should be removed
}

export type IChild = string | number | Ref<string | number> | boolean | symbol | undefined | Dayjs | TypeNode;
export type ISlotRef<T extends IChild = IChild> = Signal<T> | Computed<T>;
/**
 * 插槽
 *
 * () => new Class 多个组件调用时，会创建新的对象。
 */
export type ISlotItem<T extends IChild = IChild> = MaybeRef<T | T[]> | MaybeRef<T>[]
  | ((...args: any[]) => ISlotItem<T>);

export interface ISlots {
  [propName: 'default' | string]: ISlotItem | undefined;
}

export interface OptionProps extends TypeProps {
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
