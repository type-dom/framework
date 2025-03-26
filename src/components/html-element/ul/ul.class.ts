import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeUL } from '../../../core/type-html/ul/ul.abstract';
import type { IUL } from './ul.interface';

export class UL extends TypeUL implements IUL {
  className: 'UL';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'UL';

    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
