import { ITypeConfig } from '../../../config.interface';
import { TypeDel } from '../../../type-element/type-html/del/del.abstract';
import type { IDel } from './del.interface';

export class Del extends TypeDel implements IDel {
  className: 'Del';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Del';
    this.setConfig(config);
  }
}
