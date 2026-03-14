import { TypeMenu } from '../../../../core/abstracts/type-html/menu/menu.abstract';
import { MenuProps } from '../../../../core/abstracts/type-html/menu/menu.interface';
import type { IMenu } from './menu.interface';

export class Menu extends TypeMenu implements IMenu {
  className: 'Menu';
  constructor(params: MenuProps = {}) {
    super(params);
    this.className = 'Menu';
  }
}
