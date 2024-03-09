import { ITypeConfig } from '../../../config.interface';
import { TypeDL } from '../../../type-element/type-html/dl/dl.abstract';
import type { IDL } from './dl.interface';

export class DL extends TypeDL implements IDL {
  className: 'DL';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'DL';
    this.setConfig(config);
  }
}
