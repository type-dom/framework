import { TypeS } from '../../../../core/abstracts/type-html/s/s.abstract';
import { SProps } from '../../../../core/abstracts/type-html/s/s.interface';
import type { IS } from './s.interface';

export class S extends TypeS implements IS {
  className: 'S';

  constructor(params: SProps = {}) {
    super(params);
    this.className = 'S';
  }
}
