import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableHeaderCell, TableHeaderCellProps } from './header-cell.interface';

// 表格表头 table header cell
export abstract class TypeTableHeaderCell<Props extends TableHeaderCellProps = TableHeaderCellProps> extends TypeHtml<Props> implements ITypeTableHeaderCell {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('th');
  }
}
