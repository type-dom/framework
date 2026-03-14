import { TypeHtml } from '../type-html.abstract';
import type { ITypeAddress, AddressProps } from './address.interface';

export abstract class TypeAddress<Props extends AddressProps = AddressProps>
  extends TypeHtml<Props> implements ITypeAddress {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('address');
  }
}
