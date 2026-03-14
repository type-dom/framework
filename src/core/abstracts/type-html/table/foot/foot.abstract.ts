import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableFoot, TableFootProps } from './foot.interface';

export abstract class TypeTableFoot<Props extends TableFootProps = TableFootProps> extends TypeHtml<Props> implements ITypeTableFoot {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('tfoot');
  }
}
