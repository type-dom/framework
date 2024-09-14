import type { ITextNode } from '../../../../core/text-node/text-node.interface';
import type { ITypeHtml } from '../../type-html.interface';

export interface ITypeTableHeaderCell extends ITypeHtml {
  nodeName: 'th';
  childNodes: ITextNode[];
}
