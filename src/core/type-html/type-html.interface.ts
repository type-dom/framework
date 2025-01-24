/**
 * 定义一个html虚拟标签的接口，扩展自ITypeElement接口。
 * 该接口用于描述html元素的结构，包括子节点信息。
 *
 * @extends ITypeElement 继承自ITypeElement接口，扩展html特定的属性和方法。
 */
import { ITypeConfig, ITypeNode } from '../../core/type-node/type-node.interface';
import { ITypeElement } from '../../core/type-element/type-element.interface';

export interface ITypeHtml extends ITypeElement {
  props: ITypeHtmlConfig;
  /**
   * 存储子节点的数组，每个子节点都是ITypeNode类型。
   * 用于描述html元素下的子元素集合。
   */
  childNodes: Array<ITypeNode>;
}

export interface ITypeHtmlConfig extends ITypeConfig {
  nodeName?: keyof HTMLElementTagNameMap | 'menuitem' | string;
}
