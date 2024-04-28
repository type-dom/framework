import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeDfn } from '../../../type-element/type-html/dfn/dfn.abstract';
import type { IDfn } from './dfn.interface';

export class Dfn extends TypeDfn implements IDfn {
  className: 'Dfn';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Dfn';
    this.setConfig(config);
  }
}
