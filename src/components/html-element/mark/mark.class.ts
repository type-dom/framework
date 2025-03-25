import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeMark } from '../../../core/type-html/mark/mark.abstract';
import type { IMark } from './mark.interface';

export class Mark extends TypeMark implements IMark {
  className: 'Mark';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Mark';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
