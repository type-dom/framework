import { ITypeConfig } from '../../../config.interface';
import { TypeAbbr } from '../../../type-element/type-html/abbr/abbr.abstract';
import type { IAbbr } from './abbr.interface';

export class Abbr extends TypeAbbr implements IAbbr {
  className: 'Abbr';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Abbr';
    this.setConfig(config);
  }
}
