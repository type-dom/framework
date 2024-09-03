import { TypeI } from '../../type-html/i/i.abstract';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { II } from './i.interface';

export class I extends TypeI implements II {
  className: 'I';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'I';
    this.setParams(params);
  }
}
