import { TypeI } from '../../../../core/components/type-html/i/i.abstract';
import { IProps } from '../../../../core/components/type-html/i/i.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { II } from './i.interface';

export class I extends TypeI implements II {
  className: 'I';

  override isBasic = true;

  constructor(params: IProps = {}) {
    super(params);
    this.className = 'I';
    transformSlot(this, params.slot);
  }
}
