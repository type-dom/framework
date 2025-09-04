import { TypeRt } from '../../../../core/components/type-html/rt/rt.abstract';
import { TypeRtProps } from '../../../../core/components/type-html/rt/rt.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IRt } from './rt.interface';

export class Rt extends TypeRt implements IRt {
  className: 'Rt';

  override isBasic = true;

  constructor(params: TypeRtProps = {}) {
    super();
    this.className = 'Rt';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
