import { TypeMark } from '../../../core/type-html/mark/mark.abstract';
import { TypeMarkProps } from '../../../core/type-html/mark/mark.interface';
import type { IMark } from './mark.interface';

export class Mark extends TypeMark implements IMark {
  className: 'Mark';

  override isBasic = true;

  constructor(params: TypeMarkProps = {}) {
    super();
    this.className = 'Mark';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
