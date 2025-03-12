import { TypeHtml } from '../type-html.abstract';
import type { ITypeAddress, TypeAddressProps } from './address.interface';

export abstract class TypeAddress extends TypeHtml implements ITypeAddress {
  props: TypeAddressProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'address'
    })
  }
}
