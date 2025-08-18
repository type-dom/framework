import type { ITypeNode } from '../../../core/type-node/type-node.interface';

/**
 * @author xjf
 * @create 2023/6/18 18:06
 * @description 文本节点字面量
 */
export interface ITextNode extends ITypeNode {
  className?: 'TextNode';
  // params?: TypeProps;
  // props: {
  //   nodeName: NodeName.TEXT;
  //   nodeValue: string | number;
  // }
}
