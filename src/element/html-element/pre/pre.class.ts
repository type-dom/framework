import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypePre } from '../../../type-element/type-html/pre/pre.abstract';
import type { IPre } from './pre.interface';

export class Pre extends TypePre implements IPre {
  className: 'Pre';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Pre';
  }
}
