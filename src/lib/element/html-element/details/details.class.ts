import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeDetails } from '../../../type-element/type-html/details/details.abstract';
import type { IDetails } from './details.interface';

export class Details extends TypeDetails implements IDetails {
  className: 'Details';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Details';
    this.setConfig(config);
  }
}
