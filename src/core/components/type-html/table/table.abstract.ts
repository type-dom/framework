import { defaultProps } from '../../../helpers/defaultProps';
import { TypeHtml } from '../type-html.abstract';
import { ITypeTable, TableProps } from './table.interface';

export abstract class TypeTable<Props extends TableProps = TableProps> extends TypeHtml<Props> implements ITypeTable {
  dom: HTMLTableElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'table'
    } as Props));
    this.dom = document.createElement('table');
  }
}
