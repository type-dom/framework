import { TypeHtml } from '../type-html.abstract';
import { ITypeNav, ITypeNavConfig } from './nav.interface';

export abstract class TypeNav extends TypeHtml implements ITypeNav {
  props: ITypeNavConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'nav'
    })
  }
}
