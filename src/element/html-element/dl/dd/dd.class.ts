import { TypeHtml } from '../../../../type-element/type-html/type-html.abstract';
import { TypeDD } from '../../../../type-element/type-html/dl/dd/dd.abstract';
import type { IDD } from './dd.interface';

export class DD extends TypeDD implements IDD {
  className: 'DD';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'DD';
  }
}
