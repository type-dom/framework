import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableDataCell, ITypeTableDataCellConfig } from './data-cell.interface';

export abstract class TypeTableDataCell extends TypeHtml implements ITypeTableDataCell {
  props: ITypeTableDataCellConfig;
  dom?: HTMLTableCellElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'td'
    })
  }
}
