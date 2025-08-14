import { TypeCite } from '../../../core/type-html/cite/cite.abstract';
import { TypeCiteProps } from '../../../core/type-html/cite/cite.interface';
import type { ICite } from './cite.interface';

export class Cite extends TypeCite implements ICite {
  className: 'Cite';

  override isBasic = true;

  constructor(params: TypeCiteProps = {}) {
    super();
    this.className = 'Cite';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
