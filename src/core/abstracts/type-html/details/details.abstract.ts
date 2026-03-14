import { TypeHtml } from '../type-html.abstract';
import { ITypeDetails, DetailsProps } from './details.interface';

export abstract class TypeDetails<Props extends DetailsProps = DetailsProps> extends TypeHtml<Props> implements ITypeDetails {
  dom: HTMLDetailsElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('details');
  }
}
