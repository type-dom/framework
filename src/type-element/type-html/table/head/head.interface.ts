import type { ITypeHtml } from '../../type-html.interface';
import type { ITypeTableHeaderCell } from '../header-cell/header-cell.interface';

export interface ITypeTableHead extends ITypeHtml {
  nodeName: 'thead';
  childNodes: ITypeTableHeaderCell[];
}
