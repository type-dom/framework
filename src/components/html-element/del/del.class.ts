import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeDel } from '../../../core/type-html/del/del.abstract';
import type { IDel } from './del.interface';

export class Del extends TypeDel implements IDel {
  className: 'Del';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Del';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
