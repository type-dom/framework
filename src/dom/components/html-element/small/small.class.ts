import { TypeSmall } from '../../../../core/components/type-html/small/small.abstract';
import { SmallProps } from '../../../../core/components/type-html/small/small.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISmall } from './small.interface';

export class Small extends TypeSmall implements ISmall {
  className: 'Small';

  override isBasic = true;

  constructor(params: SmallProps = {}) {
    super(params);
    this.className = 'Small';
    transformSlot(this, params.slot);
  }
}
