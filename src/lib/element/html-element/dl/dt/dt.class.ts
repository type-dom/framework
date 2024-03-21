import { ITypeConfig } from '../../../../type-node/type-node.interface';
import { TypeDT } from '../../../../type-element/type-html/dl/dt/dt.abstract';
import type { IDT } from './dt.interface';

export class DT extends TypeDT implements IDT {
  className: 'DT';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'DT';
    this.setConfig(config);
  }
}
