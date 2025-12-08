import { TypeRt } from '../../../../core/components/type-html/rt/rt.abstract';
import { RtProps } from '../../../../core/components/type-html/rt/rt.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IRt } from './rt.interface';

export class Rt extends TypeRt implements IRt {
  className: 'Rt';

  override isBasic = true;

  constructor(params: RtProps = {}) {
    super(params);
    this.className = 'Rt';
    transformSlot(this, params.slot);
  }
}
