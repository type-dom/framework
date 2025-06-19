import { TypeHtml } from '../type-html.abstract';
import { ITypeKbd, TypeKbdProps } from './kbd.interface';

export abstract class TypeKbd extends TypeHtml implements ITypeKbd {
  props: TypeKbdProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'kbd'
    })
  }
}
