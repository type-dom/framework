import { TypeMark } from '../../../../core/components/type-html/mark/mark.abstract';
import { MarkProps } from '../../../../core/components/type-html/mark/mark.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IMark } from './mark.interface';

export class Mark extends TypeMark implements IMark {
  className: 'Mark';

  override isBasic = true;

  constructor(params: MarkProps = {}) {
    super(params);
    this.className = 'Mark';
    transformSlot(this, params.slot);
  }
}
