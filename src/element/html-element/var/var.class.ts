import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeVar } from '../../../type-element/type-html/var/var.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IVar } from './var.interface';
export class Var extends TypeVar implements IVar {
  className: 'Var';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Var';
  }
}
