import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeOL } from '../../../type-element/type-html/ol/ol.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IOL } from './ol.interface';
export class OL extends TypeOL implements IOL {
  className: 'OL';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'OL';
  }
}
