import { ITypeConfig } from '../../../config.interface';
import { TypeS } from '../../../type-element/type-html/s/s.abstract';
import type { IS } from './s.interface';

export class S extends TypeS implements IS {
  className: 'S';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'S';
    this.setConfig(config);
  }
}
