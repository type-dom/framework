import { TypeCite } from '../../../../core/components/type-html/cite/cite.abstract';
import { TypeCiteProps } from '../../../../core/components/type-html/cite/cite.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ICite } from './cite.interface';

export class Cite extends TypeCite implements ICite {
  className: 'Cite';

  override isBasic = true;

  constructor(params: TypeCiteProps = {}) {
    super();
    this.className = 'Cite';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
