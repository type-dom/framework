import { TypeMark } from '../../../../core/abstracts/type-html/mark/mark.abstract';
import { MarkProps } from '../../../../core/abstracts/type-html/mark/mark.interface';
import type { IMark } from './mark.interface';

export class Mark extends TypeMark implements IMark {
  className: 'Mark';
  constructor(params: MarkProps = {}) {
    super(params);
    this.className = 'Mark';
  }
}
