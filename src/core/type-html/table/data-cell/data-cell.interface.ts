import { IntrinsicElementAttributes } from '../../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableDataCell extends ITypeHtml {
  props: TypeTableDataCellProps;
}

export interface TypeTableDataCellProps extends HtmlProps {
  nodeName?: 'td';
  attrObj?: IntrinsicElementAttributes['td'];
}
