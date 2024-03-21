import type { ITypeAttribute } from '../type-element/type-element.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { IStyle } from '../style/style.interface';
import { TextNode } from '../text-node/text-node.class';

export interface INodeAttr {
  name: string;
  value: string;
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
  attributes?: INodeAttr[];
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
  isRoot?: boolean; // 是否是根节点 一般TypeRoot才为true，其他为false。也可以自定义。
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
  // type?: string;
}

// 参数为 ITypeConfig
export interface ITypeConfig extends ITypeNode {
  name?: string;
  text?: string; // 只是简单的添加一个文本节点时用，
  // todo 可能是类实例对象；也可能是json对象；
  childNodes?: (TypeElement | TextNode)[];
}
