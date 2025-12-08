import { TypeDL } from '../../../../core/components/type-html/dl/dl.abstract';
import { DLProps } from '../../../../core/components/type-html/dl/dl.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IDL } from './dl.interface';

export class DL extends TypeDL implements IDL {
  className: 'DL';

  override isBasic = true;

  constructor(params: DLProps = {}) {
    super(params);
    this.className = 'DL';
    transformSlot(this, params.slot);
  }
}
