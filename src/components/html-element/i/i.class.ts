import { TypeI } from '../../../core/type-html/i/i.abstract';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { II } from './i.interface';

export class I extends TypeI implements II {
  className: 'I';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'I';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
