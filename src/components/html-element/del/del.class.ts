import { TypeDel } from '../../../core/type-html/del/del.abstract';
import { TypeDelProps } from '../../../core/type-html/del/del.interface';
import type { IDel } from './del.interface';

export class Del extends TypeDel implements IDel {
  className: 'Del';

  override isBasic = true;

  constructor(params: TypeDelProps = {}) {
    super();
    this.className = 'Del';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
