import { TypeU } from '../../../../core/components/type-html/u/u.abstract';
import { TypeUProps } from '../../../../core/components/type-html/u/u.interface';
import type { IU } from './u.interface';

export class U extends TypeU implements IU {
  className: 'U';

  override isBasic = true;

  constructor(params: TypeUProps = {}) {
    super();
    this.className = 'U';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
