import { TypeA } from '../../../type-html/a/a.abstract';
import type { ITypeConfig } from '../../../type-node/type-node.interface';
import type { IA } from './a.interface';

export class A extends TypeA implements IA {
  className: 'A';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'A';
    this.setConfig(config);
  }
}
