import { TypeUL } from '../../../../core/components/type-html/ul/ul.abstract';
import { ULProps } from '../../../../core/components/type-html/ul/ul.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IUL } from './ul.interface';

export class UL extends TypeUL implements IUL {
  className: 'UL';

  override isBasic = true;

  constructor(params: ULProps = {}) {
    // console.warn('UL constructor . ');
    super(params);
    this.className = 'UL';
    transformSlot(this, params.slot);
  }
}
