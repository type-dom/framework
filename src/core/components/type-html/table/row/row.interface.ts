import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableRow extends ITypeHtml {
  props: TableRowProps;
}

export interface TableRowProps extends HtmlProps {
  nodeName?: 'tr';
  attrObj?: IntrinsicElementAttributes['tr'];
}
