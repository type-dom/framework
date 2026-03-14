import { TypeMeter } from '../../../../core/abstracts/type-html/meter/meter.abstract';
import { MeterProps } from '../../../../core/abstracts/type-html/meter/meter.interface';
import type { IMeter } from './meter.interface';

export class Meter extends TypeMeter implements IMeter {
  className: 'Meter';
  constructor(params: MeterProps = {}) {
    super(params);
    this.className = 'Meter';
  }
}
