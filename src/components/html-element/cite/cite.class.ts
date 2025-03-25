import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeCite } from '../../../core/type-html/cite/cite.abstract';
import type { ICite } from './cite.interface';

export class Cite extends TypeCite implements ICite {
  className: 'Cite';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Cite';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
