import { TypeI } from '../../../core/type-html/i/i.abstract';
import { TypeIProps } from '../../../core/type-html/i/i.interface';
import type { II } from './i.interface';

export class I extends TypeI implements II {
  className: 'I';

  override isBasic = true;

  constructor(params: TypeIProps = {}) {
    super();
    this.className = 'I';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
