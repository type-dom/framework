import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeMenu } from '../../../type-element/type-html/menu/menu.abstract';
import { XElement } from '../../../x-element/x-element.class';
import { IMenu } from './menu.interface';
export class Menu extends TypeMenu implements IMenu {
  className: 'Menu';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Menu';
  }
}
