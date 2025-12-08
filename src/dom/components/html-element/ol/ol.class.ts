import { TypeOL } from '../../../../core/components/type-html/ol/ol.abstract';
import { OLProps } from '../../../../core/components/type-html/ol/ol.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IOL } from './ol.interface';

export class OL extends TypeOL implements IOL {
  className: 'OL';

  override isBasic = true;

  constructor(params: OLProps = {}) {
    super(params);
    this.className = 'OL';
    transformSlot(this, params.slot);
  }
}
