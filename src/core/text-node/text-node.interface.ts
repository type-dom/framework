import type { ITypeConfig, ITypeNode } from '../type-node/type-node.interface';

/**
 * @author xjf
 * @create 2023/6/18 18:06
 * @description 文本节点字面量
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Text
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Node
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/NonDocumentTypeChildNode
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode/nextElementSibling
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode/previousElementSibling
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode/remove
 */
export interface ITextNode extends ITypeNode {
  className?: 'TextNode';
  params?: ITypeConfig;
  // props: {
  //   nodeName: '#text';
  //   nodeValue: string | number;
  // }
}
