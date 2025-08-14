import { TypePre } from '../../../core/type-html/pre/pre.abstract';
import { TypePreProps } from '../../../core/type-html/pre/pre.interface';
import type { IPre } from './pre.interface';

export class Pre extends TypePre implements IPre {
  className: 'Pre';

  override isBasic = true;

  constructor(params: TypePreProps = {}) {
    super();
    this.className = 'Pre';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
