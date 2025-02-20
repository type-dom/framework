import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeHr } from '../../../core/type-html/hr/hr.abstract';
import type { IHr } from './hr.interface';

export class Hr extends TypeHr implements IHr {
  className: 'Hr';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Hr';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
