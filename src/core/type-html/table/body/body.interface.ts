import { IntrinsicElementAttributes } from '../../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';
import type { ITypeTableRow } from '../row/row.interface';

export interface ITypeTableBody extends ITypeHtml {
  props: TypeTableBodyProps;
  childNodes: ITypeTableRow[];
}

export interface TypeTableBodyProps extends HtmlProps {
  nodeName?: 'tbody';
  attrObj?: IntrinsicElementAttributes['tbody'];
}
