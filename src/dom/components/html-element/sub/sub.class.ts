import { TypeSub } from '../../../../core/components/type-html/sub/sub.abstract';
import { SubProps } from '../../../../core/components/type-html/sub/sub.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISub } from './sub.interface';

export class Sub extends TypeSub implements ISub {
  className: 'Sub';
  override isBasic = true;

  constructor(params: SubProps = {}) {
    super(params);
    this.className = 'Sub';
    transformSlot(this, params.slot);
  }
}
