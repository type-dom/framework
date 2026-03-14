import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableRow, TableRowProps } from './row.interface';

export abstract class TypeTableRow<Props extends TableRowProps = TableRowProps> extends TypeHtml<Props> implements ITypeTableRow {
  dom: HTMLTableRowElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    // console.log('trData is ', trData);
    this.dom = document.createElement('tr');
  }
}
