import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeDel } from '../../type-html/del/del.abstract';
import type { IDel } from './del.interface';

export class Del extends TypeDel implements IDel {
  className: 'Del';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Del';
    this.setProps(params);
  }
}
