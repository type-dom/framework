import type { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeMeter } from '../../../type-html/meter/meter.abstract';
import type { IMeter } from './meter.interface';

export class Meter extends TypeMeter implements IMeter {
  className: 'Meter';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Meter';
    this.setConfig(config);
  }
}
