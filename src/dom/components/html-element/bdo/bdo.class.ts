import { TypeBdo } from '../../../../core/components/type-html/bdo/bdo.abstract';
import { TypeBdoProps } from '../../../../core/components/type-html/bdo/bdo.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IBdo } from './bdo.interface';

export class Bdo extends TypeBdo implements IBdo {
  className: 'Bdo';

  override isBasic = true;

  constructor(params: TypeBdoProps = {}) {
    super();
    this.className = 'Bdo';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
