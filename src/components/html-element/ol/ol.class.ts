import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeOL } from '../../../core/type-html/ol/ol.abstract';
import type { IOL } from './ol.interface';

export class OL extends TypeOL implements IOL {
  className: 'OL';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'OL';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
