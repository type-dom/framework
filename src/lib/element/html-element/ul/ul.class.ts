import { ITypeConfig } from '../../../config.interface';
import { TypeUL } from '../../../type-element/type-html/ul/ul.abstract';
import type { IUL } from './ul.interface';

export class UL extends TypeUL implements IUL {
  className: 'UL';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'UL';
    this.setConfig(config);
  }
}
