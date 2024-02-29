import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeCite } from '../../../type-element/type-html/cite/cite.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { ICite } from './cite.interface';
export class Cite extends TypeCite implements ICite {
  className: 'Cite';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Cite';
  }
}
