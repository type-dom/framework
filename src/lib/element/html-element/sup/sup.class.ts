import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeSup } from '../../../type-element/type-html/sup/sup.abstract';
import type { ISup } from './sup.interface';

export class Sup extends TypeSup implements ISup {
  className: 'Sup';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Sup';
    this.setConfig(config);
  }
}
