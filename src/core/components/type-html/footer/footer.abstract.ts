import { TypeHtml } from '../type-html.abstract';
import { ITypeFooter, FooterProps } from './footer.interface';

export abstract class TypeFooter<Props extends FooterProps = FooterProps> extends TypeHtml<Props> implements ITypeFooter {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'footer'
    } as Props);
    this.dom = document.createElement('footer');
  }
}
