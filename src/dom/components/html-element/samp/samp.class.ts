import { TypeSamp } from '../../../../core/abstracts/type-html/samp/samp.abstract';
import { SampProps } from '../../../../core/abstracts/type-html/samp/samp.interface';
import type { ISamp } from './samp.interface';

export class Samp extends TypeSamp implements ISamp {
  className: 'Samp';
  constructor(params: SampProps = {}) {
    super(params);
    this.className = 'Samp';
  }
}
