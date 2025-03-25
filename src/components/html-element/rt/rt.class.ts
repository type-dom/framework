import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeRt } from '../../../core/type-html/rt/rt.abstract';
import type { IRt } from './rt.interface';

export class Rt extends TypeRt implements IRt {
  className: 'Rt';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Rt';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
