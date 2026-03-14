import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableColGroup, TableColGroupProps } from './col-group.interface';

export abstract class TypeTableColGroup<Props extends TableColGroupProps = TableColGroupProps> extends TypeHtml<Props> implements ITypeTableColGroup {
  dom: HTMLTableColElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('colgroup');
  }
}
