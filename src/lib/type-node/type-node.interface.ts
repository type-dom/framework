import type { ITypeAttribute } from '../type-element/type-element.interface';
import { TypeElement } from '../type-element';
import { ITypeConfig } from '../config.interface';
import { IStyle } from '../style/style.interface';

export interface INodeAttr {
  name: string;
  value: string;
}

export interface IPath {
  name: string;
  pos: number;
}

/**
 * json格式的接口，也是json存储的数据结构
 */
export interface ITypeNode {
  className?: string;
  attributes?: INodeAttr[];
  nodeName?: string;
  /**
   * nodeValue只在 TextNode中才有。
   * nodeValue存在时，就应该是 TextNode类
   */
  nodeValue?: string | undefined;

  /**
   * 构造函数 new (config: ITypeConfig) , 没有parent参数
   *   todo 如何设置？？？ 这个不会转为json
   *    这个属性的类型不好设置。
   * @param config
   */
  TypeClass?: any;
  /**
   * parent 可选
   * 且为 TypeElement
   * XNode 如何处理 ———————— 不设 parent， === undefined
   */
  parent?: TypeElement;
  /**
   * 属性对象，除了style对应的属性之外的其他属性。
   */
  attrObj?: Partial<ITypeAttribute>;
  /**
   * 样式对象。
   */
  styleObj?: Partial<IStyle>;
  // TextNode 没有 childNodes
  childNodes?: ITypeNode[];
  /**
   * 属性值必须用 ' or " 包起来
   * 标签必须闭合， 如 <input /> 这样才能闭合。
   */
  template?: string; // 模板 默认TypeClass为XElement
  data?: Record<string, any>;
  // 绑定的事件集合, TypeElement 才有
  // 生成json时，基于events生成；
  // 反向转为类时，要转为events的值
  methods?: Record<string, any>;
  config?: Record<string, any>; // config不会转为json
  // 主要时createItem中用到。
  // config?: Partial<ITypeConfig>; // todo 与attrObj,styleObj,childNodes属性有重叠;作为参数可以，如果作为存储数据不太合理。
  // type?: string;
}
