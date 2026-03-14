import { TypeAbbr } from '../../../../core/abstracts/type-html/abbr/abbr.abstract';
import { AbbrProps } from '../../../../core/abstracts/type-html/abbr/abbr.interface';
import type { IAbbr } from './abbr.interface';

export class Abbr extends TypeAbbr implements IAbbr {
  className: 'Abbr';

  constructor(params: AbbrProps = {}) {
    super(params);
    this.className = 'Abbr';
  }
}
