import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeRp } from '../../../type-element/type-html/rp/rp.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IRp } from './rp.interface';

export class Rp extends TypeRp implements IRp {
  className: 'Rp';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Rp';
  }
}
