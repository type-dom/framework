import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDetails } from '../../../type-element/type-html/details/details.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IDetails } from './details.interface';
export class Details extends TypeDetails implements IDetails {
  className: 'Details';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Details';
  }
}
