import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeEm } from '../../../type-element/type-html/em/em.abstract';
import type { IEm } from './em.interface';

export class Em extends TypeEm implements IEm {
  className: 'Em';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Em';
    this.setConfig(config);
  }
}
