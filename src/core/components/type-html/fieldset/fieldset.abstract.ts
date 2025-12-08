import { TypeHtml } from '../type-html.abstract';
import { ITypeFieldset, FieldsetProps } from './fieldset.interface';

export abstract class TypeFieldset<Props extends FieldsetProps = FieldsetProps> extends TypeHtml<Props> implements ITypeFieldset {
  dom: HTMLFieldSetElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'fieldset'
    } as Props);
    this.dom = document.createElement('fieldset');
  }
}
