import { TypeHtml } from '../type-html.abstract';
import { ITypeLabel, LabelProps } from './label.interface';

export abstract class TypeLabel<Props extends LabelProps = LabelProps> extends TypeHtml<Props> implements ITypeLabel {
  dom: HTMLLabelElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'label'
    } as Props);
    this.dom = document.createElement('label');
  }
}
