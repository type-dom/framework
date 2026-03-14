import { TypeHead } from '../../../../core/abstracts/type-html/head/head.abstract';
import { HeadProps } from '../../../../core/abstracts/type-html/head/head.interface';
import type { IHead } from './head.interface';

export class Head extends TypeHead implements IHead {
  className: 'Head';
  constructor(params: HeadProps = {}) {
    super(params);
    this.className = 'Head';
  }
}
