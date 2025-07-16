import { IntrinsicElementAttributes } from '../../../attribute/attribute.interface';
import type { ITextNode } from '../../../../core/text-node/text-node.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableHeaderCell extends ITypeHtml {
  props: TypeTableHeaderCellProps;
  childNodes: ITextNode[];
}

export interface TypeTableHeaderCellProps extends HtmlProps {
  nodeName?: 'th';
  attrObj?: IntrinsicElementAttributes['th'];
}
