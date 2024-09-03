import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeAside } from '../../type-html/aside/aside.abstract';
import type { IAside } from './aside.interface';

export class Aside extends TypeAside implements IAside {
  className: 'Aside';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Aside';
    this.setParams(params);
  }
}
