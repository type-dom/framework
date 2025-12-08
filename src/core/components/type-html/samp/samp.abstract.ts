import { TypeHtml } from '../type-html.abstract';
import { ITypeSamp, SampProps } from './samp.interface';

export abstract class TypeSamp<Props extends SampProps = SampProps> extends TypeHtml<Props> implements ITypeSamp {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'samp'
    } as Props);
    this.dom = document.createElement('samp');
  }
}
