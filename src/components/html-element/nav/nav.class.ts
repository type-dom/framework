import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeNav } from '../../type-html/nav/nav.abstract';
import type { INav } from './nav.interface';

export class Nav extends TypeNav implements INav {
  className: 'Nav';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Nav';
    this.setParams(params);
  }
}
