import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeMenu } from '../../../type-element/type-html/menu/menu.abstract';
import type { IMenu } from './menu.interface';

export class Menu extends TypeMenu implements IMenu {
  className: 'Menu';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Menu';
  }
}
