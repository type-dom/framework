import { TypeHtml } from '../../type-html.abstract';
import { TypeTableDataCell } from '../data-cell/data-cell.abstract';
import { ITypeTableRow, TypeTableRowProps } from './row.interface';

export abstract class TypeTableRow extends TypeHtml implements ITypeTableRow {
  props: TypeTableRowProps;
  dom?: HTMLTableRowElement;
  override childNodes: TypeTableDataCell[];

  constructor()  {
    super();
    // console.log('trData is ', trData);
    this.props = this.useParams({
      nodeName: 'tr'
    })
    this.childNodes = [];
  }
}
