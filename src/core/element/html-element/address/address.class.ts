import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeAddress } from '../../../type-element/type-html/address/address.abstract';
import type { IAddress } from './address.interface';

export class Address extends TypeAddress implements IAddress {
  className: 'Address';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Address';
    this.setConfig(config);
  }
}
