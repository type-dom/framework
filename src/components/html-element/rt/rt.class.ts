import { TypeRt } from '../../../core/type-html/rt/rt.abstract';
import { TypeRtProps } from '../../../core/type-html/rt/rt.interface';
import type { IRt } from './rt.interface';

export class Rt extends TypeRt implements IRt {
  className: 'Rt';

  override isBasic = true;

  constructor(params: TypeRtProps = {}) {
    super();
    this.className = 'Rt';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
