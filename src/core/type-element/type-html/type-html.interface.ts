/**
 * 定义一个html虚拟标签的接口，扩展自ITypeElement接口。
 * 该接口用于描述html元素的结构，包括子节点信息。
 *
 * @extends ITypeElement 继承自ITypeElement接口，扩展html特定的属性和方法。
 */
import type { ITypeNode } from '../../type-node/type-node.interface';
import type { ITypeElement } from '../type-element.interface';

export interface ITypeHtml extends ITypeElement {
  /**
   * 存储子节点的数组，每个子节点都是ITypeNode类型。
   * 用于描述html元素下的子元素集合。
   */
  childNodes: Array<ITypeNode>;
}
