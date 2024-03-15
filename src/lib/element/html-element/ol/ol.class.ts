import { ITypeConfig } from '../../../config.interface';
import { TypeOL } from '../../../type-element/type-html/ol/ol.abstract';
import type { IOL } from './ol.interface';

export class OL extends TypeOL implements IOL {
  className: 'OL';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'OL';
    this.setConfig(config);
  }
}
