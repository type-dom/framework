import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeU } from '../../../type-element/type-html/u/u.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IU } from './u.interface';
export class U extends TypeU implements IU {
  className: 'U';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'U';
  }
}
