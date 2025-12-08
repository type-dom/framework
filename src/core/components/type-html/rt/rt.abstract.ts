import { TypeHtml } from '../type-html.abstract';
import { ITypeRt, RtProps } from './rt.interface';

export abstract class TypeRt<Props extends RtProps = RtProps> extends TypeHtml<Props> implements ITypeRt {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'rt'
    } as Props);
    this.dom = document.createElement('rt');
  }
}
