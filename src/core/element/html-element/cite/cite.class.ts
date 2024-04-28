import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeCite } from '../../../type-element/type-html/cite/cite.abstract';
import type { ICite } from './cite.interface';

export class Cite extends TypeCite implements ICite {
  className: 'Cite';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Cite';
    this.setConfig(config);
  }
}
