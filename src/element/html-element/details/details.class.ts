import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDetails } from '../../../type-element/type-html/details/details.abstract';
import type { IDetails } from './details.interface';

export class Details extends TypeDetails implements IDetails {
  className: 'Details';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Details';
  }
}
