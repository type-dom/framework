import { TypeRp } from '../../../../core/abstracts/type-html/rp/rp.abstract';
import { RpProps } from '../../../../core/abstracts/type-html/rp/rp.interface';
import type { IRp } from './rp.interface';

export class Rp extends TypeRp implements IRp {
  className: 'Rp';
  constructor(params: RpProps = {}) {
    super(params);
    this.className = 'Rp';
  }
}
