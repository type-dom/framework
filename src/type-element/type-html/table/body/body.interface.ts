import type { ITypeHtml } from '../../type-html.interface';
import type { ITypeTableRow } from '../row/row.interface';
export interface ITypeTableBody extends ITypeHtml {
  nodeName: 'tbody',
  childNodes: ITypeTableRow[],
}
