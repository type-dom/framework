import { ITypeConfig } from '../../../config.interface';
import { TypeB } from '../../../type-element/type-html/b/b.abstract';
import type { IB } from './b.interface';

export class B extends TypeB implements IB {
  className: 'B';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'B';
    this.setConfig(config);
  }
}
