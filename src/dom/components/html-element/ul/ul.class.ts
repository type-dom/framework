import { TypeUL } from '../../../../core/abstracts/type-html/ul/ul.abstract';
import { ULProps } from '../../../../core/abstracts/type-html/ul/ul.interface';
import type { IUL } from './ul.interface';

export class UL extends TypeUL implements IUL {
  className: 'UL';
  constructor(params: ULProps = {}) {
    // console.warn('UL constructor . ');
    super(params);
    this.className = 'UL';
  }
}
