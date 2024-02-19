import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeAbbr } from '../../../type-element/type-html/abbr/abbr.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IAbbr } from './abbr.interface';
export class Abbr extends TypeAbbr implements IAbbr {
  className: 'Abbr';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Abbr';
  }
}
