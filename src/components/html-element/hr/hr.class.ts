import { TypeHr } from '../../../core/type-html/hr/hr.abstract';
import { TypeHrProps } from '../../../core/type-html/hr/hr.interface';
import type { IHr } from './hr.interface';

export class Hr extends TypeHr implements IHr {
  className: 'Hr';

  override isBasic = true;

  constructor(params: TypeHrProps = {}) {
    super();
    this.className = 'Hr';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
