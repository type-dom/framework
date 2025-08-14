import { TypeAddress } from '../../../core/type-html/address/address.abstract';
import { TypeAddressProps } from '../../../core/type-html/address/address.interface';
import type { IAddress } from './address.interface';

export class Address extends TypeAddress implements IAddress {
  className: 'Address';
  override isBasic = true;

  constructor(params: TypeAddressProps = {}) {
    super();
    this.className = 'Address';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
