import { TypeMenu } from '../../../../core/components/type-html/menu/menu.abstract';
import { MenuProps } from '../../../../core/components/type-html/menu/menu.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IMenu } from './menu.interface';

export class Menu extends TypeMenu implements IMenu {
  className: 'Menu';

  override isBasic = true;

  constructor(params: MenuProps = {}) {
    super(params);
    this.className = 'Menu';
    transformSlot(this, params.slot);
  }
}
