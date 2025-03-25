import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeOL } from '../../../core/type-html/ol/ol.abstract';
import type { IOL } from './ol.interface';

export class OL extends TypeOL implements IOL {
  className: 'OL';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'OL';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
