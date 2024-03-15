import { TypeI } from '../../../type-element/type-html/i/i.abstract';
import { ITypeConfig } from '../../../config.interface';
import type { II } from './i.interface';

export class I extends TypeI implements II {
  className: 'I';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'I';
    this.setConfig(config);
  }
}
