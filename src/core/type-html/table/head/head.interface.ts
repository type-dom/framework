import type { ITypeHtml, HtmlProps } from '../../type-html.interface';
import type { ITypeTableHeaderCell } from '../header-cell/header-cell.interface';

export interface ITypeTableHead extends ITypeHtml {
  props: TypeTableHeadProps;
  childNodes: ITypeTableHeaderCell[];
}

export interface TypeTableHeadProps extends HtmlProps {
  nodeName?: 'thead';
}
