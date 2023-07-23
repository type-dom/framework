import { ITypeProperty } from '../type-element/type-element.interface';
export interface INodeAttr {
  name: string,
  value: string;
}
export interface IPath {
  name: string,
  pos: number,
}
/**
 * json格式的接口，也是json存储的数据结构
 */
export interface ITypeNode {
  className?: string,
  nodeName?: string,
  /**
   * nodeValue只在 TextNode中才有。
   * nodeValue存在时，就应该是 TextNode类
   */
  nodeValue?: string,
  TypeClass?: any, // todo 如何设置？？？ 这个不会转为json
  /**
   * attributes只在XElement中有，并会转换为 attrObj。
   * TextNode 没有 attributes和propObj
   */
  propObj?: ITypeProperty;
  parent?: ITypeNode,
  // TextNode 没有 childNodes
  childNodes?: ITypeNode[],
  /**
   * 属性值必须用 ' or " 包起来
   * 标签必须闭合， 如 <input /> 这样才能闭合。
   */
  template?: string, // 模板 默认TypeClass为XElement
  data?: Record<string, any>,
  // attributes?: INodeAttr[];
  // 绑定的事件集合, TypeElement 才有
  // 生成json时，基于events生成；
  // 反向转为类时，要转为events的值
  methods?: Record<string, Function>,
  config?: Record<string, any>, // config不会转为json
}
