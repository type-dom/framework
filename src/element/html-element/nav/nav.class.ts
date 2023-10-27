import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeNav } from '../../../type-element/type-html/nav/nav.abstract';
import { XElement } from '../../x-element/x-element.class';
import { INav } from './nav.interface';
export class Nav extends TypeNav implements INav {
  className: 'Nav';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Nav';
  }
}
