import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableDataCell, TypeTableDataCellProps } from './data-cell.interface';

export abstract class TypeTableDataCell extends TypeHtml implements ITypeTableDataCell {
  props: TypeTableDataCellProps;
  dom?: HTMLTableCellElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'td'
    })
  }
}
