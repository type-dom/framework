import { ITypeConfig } from '../../../config.interface';
import { TypeSamp } from '../../../type-element/type-html/samp/samp.abstract';
import type { ISamp } from './samp.interface';

export class Samp extends TypeSamp implements ISamp {
  className: 'Samp';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Samp';
    this.setConfig(config);
  }
}
