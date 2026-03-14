import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableDataCell, TableDataCellProps } from './data-cell.interface';

export abstract class TypeTableDataCell<Props extends TableDataCellProps = TableDataCellProps> extends TypeHtml<Props> implements ITypeTableDataCell {
  dom: HTMLTableCellElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('td');
  }
}
