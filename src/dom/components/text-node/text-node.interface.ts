import type { ITypeNode, TypeProps } from '../../../core/type-node/type-node.interface';
import { NodeName } from '../../../core/enums';

/**
 * @author xjf
 * @create 2023/6/18 18:06
 * @description 文本节点字面量
 */
export interface ITextNode extends ITypeNode {
  className: 'TextNode';
  props: TextProps;
  // params?: TypeProps;
  // props: {
  //   nodeName?: NodeName.TEXT;
  //   nodeValue: string | number;
  // }
}

export interface TextProps extends TypeProps {
  nodeName: NodeName.TEXT;
  nodeValue: string | number;
}
