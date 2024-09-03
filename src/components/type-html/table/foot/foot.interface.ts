import { ITypeHtml } from '../../type-html.interface';
import type { ITypeTableRow } from '../row/row.interface';

export interface ITypeTableFoot extends ITypeHtml {
  nodeName: 'tfoot';
  childNodes: ITypeTableRow[];
}
