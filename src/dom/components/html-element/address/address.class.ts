import { TypeAddress } from '../../../../core/abstracts/type-html/address/address.abstract';
import { AddressProps } from '../../../../core/abstracts/type-html/address/address.interface';
import type { IAddress } from './address.interface';

export class Address extends TypeAddress implements IAddress {
  className: 'Address';

  constructor(params: AddressProps = {}) {
    super(params);
    this.className = 'Address';
  }
}
