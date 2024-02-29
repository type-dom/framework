import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeS } from '../../../type-element/type-html/s/s.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IS } from './s.interface';
export class S extends TypeS implements IS {
  className: 'S';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'S';
  }
}
