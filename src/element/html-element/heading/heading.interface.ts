import type { ITypeHead } from '../../../type-element/type-html/head/head.interface';
import type { ITextNode } from '../../../text-node/text-node.interface';
export interface IHeading extends ITypeHead {
  nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  className: 'Heading',
  childNodes: ITextNode[],
}
