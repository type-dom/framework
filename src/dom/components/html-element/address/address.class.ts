import { TypeAddress } from '../../../../core/components/type-html/address/address.abstract';
import { TypeAddressProps } from '../../../../core/components/type-html/address/address.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IAddress } from './address.interface';

export class Address extends TypeAddress implements IAddress {
  className: 'Address';
  override isBasic = true;

  constructor(params: TypeAddressProps = {}) {
    super();
    this.className = 'Address';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
