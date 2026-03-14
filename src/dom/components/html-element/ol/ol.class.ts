import { TypeOL } from '../../../../core/abstracts/type-html/ol/ol.abstract';
import { OLProps } from '../../../../core/abstracts/type-html/ol/ol.interface';
import type { IOL } from './ol.interface';

export class OL extends TypeOL implements IOL {
  className: 'OL';
  constructor(params: OLProps = {}) {
    super(params);
    this.className = 'OL';
  }
}
