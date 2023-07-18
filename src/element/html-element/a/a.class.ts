import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { XElement } from '../../../x-element/x-element.class';
import { TypeA } from '../../../type-element/type-html/a/a.abstract';
import { IA } from './a.interface';
export class A extends TypeA implements IA {
  className: 'A';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'A';
  }
}
