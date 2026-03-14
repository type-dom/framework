import { TypeB } from '../../../../core/abstracts/type-html/b/b.abstract';
import { BProps } from '../../../../core/abstracts/type-html/b/b.interface';
import type { IB } from './b.interface';

export class B extends TypeB implements IB {
  className: 'B';

  constructor(params: BProps = {}) {
    super(params);
    this.className = 'B';
  }
}
