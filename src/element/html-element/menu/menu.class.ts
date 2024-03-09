import { ITypeConfig } from '../../../config.interface';
import { TypeMenu } from '../../../type-element/type-html/menu/menu.abstract';
import type { IMenu } from './menu.interface';

export class Menu extends TypeMenu implements IMenu {
  className: 'Menu';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Menu';
    this.setConfig(config);
  }
}
