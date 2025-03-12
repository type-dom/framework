import { ITypeHtml, HtmlProps } from '../../type-html.interface';
import type { ITypeTableRow } from '../row/row.interface';

export interface ITypeTableFoot extends ITypeHtml {
  props: TypeTableFootProps;
  childNodes: ITypeTableRow[];
}

export interface TypeTableFootProps extends HtmlProps {
  nodeName?: 'tfoot';
}
