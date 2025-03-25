import { TypeI } from '../../../core/type-html/i/i.abstract';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import type { II } from './i.interface';

export class I extends TypeI implements II {
  className: 'I';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'I';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
