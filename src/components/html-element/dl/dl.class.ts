import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeDL } from '../../../core/type-html/dl/dl.abstract';
import type { IDL } from './dl.interface';

export class DL extends TypeDL implements IDL {
  className: 'DL';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'DL';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
