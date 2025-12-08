import { TypeB } from '../../../../core/components/type-html/b/b.abstract';
import { BProps } from '../../../../core/components/type-html/b/b.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IB } from './b.interface';

export class B extends TypeB implements IB {
  className: 'B';

  override isBasic = true;

  constructor(params: BProps = {}) {
    super(params);
    this.className = 'B';
    transformSlot(this, params.slot);
  }
}
