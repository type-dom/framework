import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeSub } from '../../../type-element/type-html/sub/sub.abstract';
import type { ISub } from './sub.interface';

export class Sub extends TypeSub implements ISub {
  className: 'Sub';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Sub';
    this.setConfig(config);
  }
}
