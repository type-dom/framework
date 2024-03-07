import { TypeI } from '../../../type-element/type-html/i/i.abstract';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import type { II } from './i.interface';

export class I extends TypeI implements II {
  className: 'I';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'I';
  }
}
