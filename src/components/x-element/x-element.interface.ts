/**
 * IXElement 接口扩展了 ITypeElement 接口，定义了一个具有特定类名和子节点集合的元素。
 * 这个接口适用于描述一个DOM元素，其中包含了元素的类型信息、类名以及子节点信息。
 *
 * @extends ITypeElement 继承自 ITypeElement 接口，获取其类型元素的基本属性和方法。
 */
import type { ITypeElement } from '../../core/type-element/type-element.interface';
import type { ITextNode } from '../../core/text-node/text-node.interface';
import { IAttr, ITypeConfig } from '../../core/type-node/type-node.interface';

export interface IXElement extends ITypeElement {
  className: 'XElement'; // 定义元素的类名为 'XElement'。
  // childNodes: (IXElement | ITextNode)[]; // childNodes 属性是一个由 IXElement 或 ITextNode 组成的数组，表示元素的子节点集合。
}

export interface IXElementConfig extends ITypeConfig {
  attributes?: IAttr[];
}
