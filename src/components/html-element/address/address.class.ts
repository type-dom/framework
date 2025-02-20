import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeAddress } from '../../../core/type-html/address/address.abstract';
import type { IAddress } from './address.interface';

export class Address extends TypeAddress implements IAddress {
  className: 'Address';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Address';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
