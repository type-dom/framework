import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeDL } from '../../type-html/dl/dl.abstract';
import type { IDL } from './dl.interface';

export class DL extends TypeDL implements IDL {
  className: 'DL';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'DL';
    this.setProps(params);
  }
}
