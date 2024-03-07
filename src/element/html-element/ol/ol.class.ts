import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeOL } from '../../../type-element/type-html/ol/ol.abstract';
import type { IOL } from './ol.interface';

export class OL extends TypeOL implements IOL {
  className: 'OL';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'OL';
  }
}
