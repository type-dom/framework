import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeMeter } from '../../../type-element/type-html/meter/meter.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IMeter } from './meter.interface';
export class Meter extends TypeMeter implements IMeter {
  className: 'Meter';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Meter';
  }
}
