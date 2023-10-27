import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSamp } from '../../../type-element/type-html/samp/samp.abstract';
import { XElement } from '../../x-element/x-element.class';
import { ISamp } from './samp.interface';
export class Samp extends TypeSamp implements ISamp {
  className: 'Samp';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Samp';
  }
}
