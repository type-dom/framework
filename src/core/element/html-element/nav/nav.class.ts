import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeNav } from '../../../type-element/type-html/nav/nav.abstract';
import type { INav } from './nav.interface';

export class Nav extends TypeNav implements INav {
  className: 'Nav';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Nav';
    this.setConfig(config);
  }
}
