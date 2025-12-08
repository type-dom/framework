import { TypeHtml } from '../type-html.abstract';
import { ITypeSelect, SelectProps } from './select.interface';

export abstract class TypeSelect<Props extends SelectProps = SelectProps> extends TypeHtml<Props> implements ITypeSelect {
  dom: HTMLSelectElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'select'
    } as Props);
    this.dom = document.createElement('select');
  }
}
