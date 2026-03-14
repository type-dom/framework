import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableFoot extends ITypeHtml {
  props: TableFootProps;
}

export interface TableFootProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['tfoot'];
}
