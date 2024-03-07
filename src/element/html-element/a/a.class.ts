import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeA } from '../../../type-element/type-html/a/a.abstract';
import type { IA } from './a.interface';

export class A extends TypeA implements IA {
  className: 'A';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'A';
  }
}
