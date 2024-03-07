import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeMeter } from '../../../type-element/type-html/meter/meter.abstract';
import type { IMeter } from './meter.interface';

export class Meter extends TypeMeter implements IMeter {
  className: 'Meter';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Meter';
  }
}
