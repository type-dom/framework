import { ITypeConfig } from '../../../../core/type-node/type-node.interface';
import { TypeDT } from '../../../type-html/dl/dt/dt.abstract';
import type { IDT } from './dt.interface';

export class DT extends TypeDT implements IDT {
  className: 'DT';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'DT';
    this.setParams(params);
  }
}
