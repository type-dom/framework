import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeMark } from '../../../core/type-html/mark/mark.abstract';
import type { IMark } from './mark.interface';

export class Mark extends TypeMark implements IMark {
  className: 'Mark';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Mark';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
