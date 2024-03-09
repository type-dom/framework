import { ITypeConfig } from '../../../config.interface';
import { TypeRp } from '../../../type-element/type-html/rp/rp.abstract';
import type { IRp } from './rp.interface';

export class Rp extends TypeRp implements IRp {
  className: 'Rp';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Rp';
    this.setConfig(config);
  }
}
