import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeAddress } from '../../../core/type-html/address/address.abstract';
import type { IAddress } from './address.interface';

export class Address extends TypeAddress implements IAddress {
  className: 'Address';
  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Address';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
