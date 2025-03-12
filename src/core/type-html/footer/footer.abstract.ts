import { TypeHtml } from '../type-html.abstract';
import { ITypeFooter, TypeFooterProps } from './footer.interface';

export abstract class TypeFooter extends TypeHtml implements ITypeFooter {
  props: TypeFooterProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'footer'
    })
  }
}
