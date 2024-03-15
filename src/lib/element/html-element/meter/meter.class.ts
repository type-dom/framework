import { ITypeConfig } from '../../../config.interface';
import { TypeMeter } from '../../../type-element/type-html/meter/meter.abstract';
import type { IMeter } from './meter.interface';

export class Meter extends TypeMeter implements IMeter {
  className: 'Meter';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Meter';
    this.setConfig(config);
  }
}
