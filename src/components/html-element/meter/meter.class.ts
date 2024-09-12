import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeMeter } from '../../type-html/meter/meter.abstract';
import type { IMeter } from './meter.interface';

export class Meter extends TypeMeter implements IMeter {
  className: 'Meter';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Meter';
    this.setProps(params);
  }
}
