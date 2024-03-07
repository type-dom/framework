import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeMark } from '../../../type-element/type-html/mark/mark.abstract';
import type { IMark } from './mark.interface';

export class Mark extends TypeMark implements IMark {
  className: 'Mark';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Mark';
  }
}
