import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDL } from '../../../type-element/type-html/dl/dl.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IDL } from './dl.interface';

export class DL extends TypeDL implements IDL {
  className: 'DL';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'DL';
  }
}
