import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableBody, TableBodyProps } from './body.interface';

export abstract class TypeTableBody<Props extends TableBodyProps = TableBodyProps> extends TypeHtml<Props> implements ITypeTableBody {
  dom: HTMLTableSectionElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('tbody');
  }
}
