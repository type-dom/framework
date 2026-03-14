import type { ITypeNode, TypeProps } from '../../../core/abstracts/type-node/type-node.interface';
import { NodeName } from '../../../core/enums';
import { MaybeRef } from '../../../reactivity';
import { Dayjs } from 'dayjs';

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
  text: MaybeRef<string | number | boolean | Dayjs | undefined>;
}
