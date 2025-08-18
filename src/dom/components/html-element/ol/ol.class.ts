import { TypeOL } from '../../../../core/components/type-html/ol/ol.abstract';
import { TypeOLProps } from '../../../../core/components/type-html/ol/ol.interface';
import type { IOL } from './ol.interface';

export class OL extends TypeOL implements IOL {
  className: 'OL';

  override isBasic = true;

  constructor(params: TypeOLProps = {}) {
    super();
    this.className = 'OL';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
