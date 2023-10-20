import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSup } from '../../../type-element/type-html/sup/sup.abstract';
import { XElement } from '../../x-element/x-element.class';
import { ISup } from './sup.interface';
export class Sup extends TypeSup implements ISup {
  className: 'Sup';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Sup';
  }
}
