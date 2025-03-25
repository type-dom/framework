import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeHr } from '../../../core/type-html/hr/hr.abstract';
import type { IHr } from './hr.interface';

export class Hr extends TypeHr implements IHr {
  className: 'Hr';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Hr';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
