import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypePre } from '../../../type-element/type-html/pre/pre.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IPre } from './pre.interface';
export class Pre extends TypePre implements IPre {
  className: 'Pre';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Pre';
  }
}
