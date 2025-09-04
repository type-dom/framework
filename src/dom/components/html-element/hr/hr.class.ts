import { TypeHr } from '../../../../core/components/type-html/hr/hr.abstract';
import { TypeHrProps } from '../../../../core/components/type-html/hr/hr.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IHr } from './hr.interface';

export class Hr extends TypeHr implements IHr {
  className: 'Hr';

  override isBasic = true;

  constructor(params: TypeHrProps = {}) {
    super();
    this.className = 'Hr';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
