import { TypeHtml } from '../type-html.abstract';
import { ITypeP, PProps } from './p.interface';

export abstract class TypeP<Props extends PProps = PProps>
  extends TypeHtml<Props> implements ITypeP {
  dom: HTMLParagraphElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'p'
    } as Props);
    this.dom = document.createElement('p');
  }
}
