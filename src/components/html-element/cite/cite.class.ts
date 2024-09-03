import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeCite } from '../../type-html/cite/cite.abstract';
import type { ICite } from './cite.interface';

export class Cite extends TypeCite implements ICite {
  className: 'Cite';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Cite';
    this.setParams(params);
  }
}
