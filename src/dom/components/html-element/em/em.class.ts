import { TypeEm } from '../../../../core/abstracts/type-html/em/em.abstract';
import { EmProps } from '../../../../core/abstracts/type-html/em/em.interface';
import type { IEm } from './em.interface';

export class Em extends TypeEm implements IEm {
  className: 'Em';
  constructor(params: EmProps = {}) {
    super(params);
    this.className = 'Em';
  }
}
