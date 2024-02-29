import type { ITypeHtml } from '../../type-html.interface';
import type { ITypeTableDataCell } from '../data-cell/data-cell.interface';

export interface ITypeTableRow extends ITypeHtml {
  nodeName: 'tr',
  childNodes: ITypeTableDataCell[],
}
