import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableCol, TableColProps } from './col.interface';

export abstract class TypeTableCol<Props extends TableColProps = TableColProps> extends TypeHtml<Props> implements ITypeTableCol {
  dom: HTMLTableColElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('col');
  }
}
