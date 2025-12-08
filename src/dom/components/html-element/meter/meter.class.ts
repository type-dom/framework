import { TypeMeter } from '../../../../core/components/type-html/meter/meter.abstract';
import { MeterProps } from '../../../../core/components/type-html/meter/meter.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IMeter } from './meter.interface';

export class Meter extends TypeMeter implements IMeter {
  className: 'Meter';

  override isBasic = true;

  constructor(params: MeterProps = {}) {
    super(params);
    this.className = 'Meter';
    transformSlot(this, params.slot);
  }
}
