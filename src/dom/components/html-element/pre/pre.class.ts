import { TypePre } from '../../../../core/abstracts/type-html/pre/pre.abstract';
import { PreProps } from '../../../../core/abstracts/type-html/pre/pre.interface';
import type { IPre } from './pre.interface';

export class Pre extends TypePre implements IPre {
  className: 'Pre';
  constructor(params: PreProps = {}) {
    super(params);
    this.className = 'Pre';
  }
}
