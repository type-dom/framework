import { TypeHtml } from '../type-html.abstract';
import { ITypeRp, RpProps } from './rp.interface';

export abstract class TypeRp<Props extends RpProps = RpProps> extends TypeHtml<Props> implements ITypeRp {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'rp'
    } as Props);
    this.dom = document.createElement('rp');
  }
}
