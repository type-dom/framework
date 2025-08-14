import { TypeP } from '../../../core/type-html/p/p.abstract';
import { TypePProps } from '../../../core/type-html/p/p.interface';
import type { IP } from './p.interface';

export class P extends TypeP implements IP {
  className: 'P';

  override isBasic = true;

  constructor(params: TypePProps = {}) {
    super();
    this.className = 'P';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
