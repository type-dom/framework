import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSamp } from '../../../type-element/type-html/samp/samp.abstract';
import type { ISamp } from './samp.interface';

export class Samp extends TypeSamp implements ISamp {
  className: 'Samp';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Samp';
  }
}
