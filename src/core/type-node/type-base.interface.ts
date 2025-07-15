import { MaybeRef } from '../../reactivity';
import { TypeElement } from '../type-element/type-element.abstract';
import type { ISettings } from './type-node.interface';
import { TdDom } from '../type-element';

/**
 * TypeDom 最基础的接口，所有接口都继承了这个接口。
 *
 * 同时可以对应json格式的接口，也是json存储的数据结构（除去parent/TypeClass）
 */
export interface ITypeBase {
  // className?: string;
  // params?: TypeProps | undefined; // 传入参数, TypeProps 中是undefined
  // attributes?: IAttr[];

  /**
   * 移动到 DOM 中 app 之外的其他位置的方式。
   * 该节点不是当前位置的组件的子节点；要避免加入到组件的子节点中；要挂载到指定的组件的DOM,甚至直接指向 body；
   * string 类型，可以指定一个选择器；
   * 挂载到指定的组件的DOM,可以直接指向 body
   * todo Teleport execute mount to outer dom, so need not to property.
   */
  to?: MaybeRef<string | TdDom>;

  /**
   * parent 可选
   * 且为 TypeElement
   */
  parent?: TypeElement;
  /**
   * 上下文，用于查找上下文。
   * 对应于创建该对象的类对象。
   * 在setConfig时，对所有子对象进行设置。
   */
  // context?: TypeNode;
  /**
   * 节点类型
   * 是否根节点；
   * root()方法返回的节点，就是根节点。
   */
  isRoot?: boolean; // 是否是根节点 一般TypeRoot才为true，其他为false。也可以自定义。

  // TextNode 肯定没有 childNodes， Element 可以没有 childNodes;
  // childNodes?: ITypeNode[] | undefined; // todo  string number type ?

  settings?: ISettings; // todo 有了 props 还需要 吗？
}
