import { TypeHtml } from '../type-html.abstract';
import { ITypeKbd, ITypeKbdConfig } from './kbd.interface';

export abstract class TypeKbd extends TypeHtml implements ITypeKbd {
  props: ITypeKbdConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'kbd'
    })
  }
}
