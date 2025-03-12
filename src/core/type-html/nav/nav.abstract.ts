import { TypeHtml } from '../type-html.abstract';
import { ITypeNav, TypeNavProps } from './nav.interface';

export abstract class TypeNav extends TypeHtml implements ITypeNav {
  props: TypeNavProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'nav'
    })
  }
}
