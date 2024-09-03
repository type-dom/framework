import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeEm } from '../../type-html/em/em.abstract';
import type { IEm } from './em.interface';

export class Em extends TypeEm implements IEm {
  className: 'Em';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Em';
    this.setParams(params);
  }
}
