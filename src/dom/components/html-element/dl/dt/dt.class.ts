import { TypeDT } from '../../../../../core/abstracts/type-html/dl/dt/dt.abstract';
import { DTProps } from '../../../../../core/abstracts/type-html/dl/dt/dt.interface';
import type { IDT } from './dt.interface';

export class DT extends TypeDT implements IDT {
  className: 'DT';

  constructor(params: DTProps = {}) {
    super(params);
    this.className = 'DT';
  }
}
