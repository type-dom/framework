import { TypeHtml } from '../type-html.abstract';
import { ITypeFooter, ITypeFooterConfig } from './footer.interface';

export abstract class TypeFooter extends TypeHtml implements ITypeFooter {
  props: ITypeFooterConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'footer'
    })
  }
}
