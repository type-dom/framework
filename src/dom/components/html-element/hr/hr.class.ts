import { TypeHr } from '../../../../core/components/type-html/hr/hr.abstract';
import { HrProps } from '../../../../core/components/type-html/hr/hr.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IHr } from './hr.interface';

export class Hr extends TypeHr implements IHr {
  className: 'Hr';

  override isBasic = true;

  constructor(params: HrProps = {}) {
    super(params);
    this.className = 'Hr';
    transformSlot(this, params.slot);
  }
}
