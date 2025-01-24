import { TypeHtml } from '../../type-html.abstract';
import { TypeTableDataCell } from '../data-cell/data-cell.abstract';
import { ITypeTableRow, ITypeTableRowConfig } from './row.interface';

export abstract class TypeTableRow extends TypeHtml implements ITypeTableRow {
  props: ITypeTableRowConfig;
  dom?: HTMLTableRowElement;
  override childNodes: TypeTableDataCell[];

  protected constructor() {
    super();
    // console.log('trData is ', trData);
    this.props = this.useParams({
      nodeName: 'tr'
    })
    this.childNodes = [];
  }
}
