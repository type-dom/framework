import type { ITypeElement } from '../../../type-element.interface';
import type { ITypeTableRow } from '../row/row.interface';

export interface ITypeTableFoot extends ITypeElement {
  nodeName: 'tfoot';
  childNodes: ITypeTableRow[];
}
