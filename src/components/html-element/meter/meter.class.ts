import { TypeMeter } from '../../../core/type-html/meter/meter.abstract';
import { TypeMeterProps } from '../../../core/type-html/meter/meter.interface';
import type { IMeter } from './meter.interface';

export class Meter extends TypeMeter implements IMeter {
  className: 'Meter';

  override isBasic = true;

  constructor(params: TypeMeterProps = {}) {
    super();
    this.className = 'Meter';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
