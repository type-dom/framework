import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSub } from '../../../type-element/type-html/sub/sub.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { ISub } from './sub.interface';
export class Sub extends TypeSub implements ISub {
  className: 'Sub';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Sub';
  }
}
