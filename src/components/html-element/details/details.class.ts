import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeDetails } from '../../type-html/details/details.abstract';
import type { IDetails } from './details.interface';

export class Details extends TypeDetails implements IDetails {
  className: 'Details';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Details';
    this.setProps(params);
  }
}
