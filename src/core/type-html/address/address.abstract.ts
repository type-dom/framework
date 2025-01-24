import { TypeHtml } from '../type-html.abstract';
import type { ITypeAddress, ITypeAddressConfig } from './address.interface';

export abstract class TypeAddress extends TypeHtml implements ITypeAddress {
  props: ITypeAddressConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'address'
    })
  }
}
