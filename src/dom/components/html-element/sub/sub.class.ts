import { TypeSub } from '../../../../core/abstracts/type-html/sub/sub.abstract';
import { SubProps } from '../../../../core/abstracts/type-html/sub/sub.interface';
import type { ISub } from './sub.interface';

export class Sub extends TypeSub implements ISub {
  className: 'Sub';

  constructor(params: SubProps = {}) {
    super(params);
    this.className = 'Sub';
  }
}
