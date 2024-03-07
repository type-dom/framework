import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeKbd } from '../../../type-element/type-html/kbd/kbd.abstract';
import type { IKbd } from './kbd.interface';

export class Kbd extends TypeKbd implements IKbd {
  className: 'Kbd';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Kbd';
  }
}
