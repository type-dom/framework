import { TypeDD } from '../../../../../core/components/type-html/dl/dd/dd.abstract';
import { DDProps } from '../../../../../core/components/type-html/dl/dd/dd.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { IDD } from './dd.interface';

export class DD extends TypeDD implements IDD {
  className: 'DD';

  override isBasic = true;

  constructor(params: DDProps = {}) {
    super(params);
    this.className = 'DD';
    transformSlot(this, params.slot);
  }
}
