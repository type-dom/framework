import { TypeMenu } from '../../../../core/components/type-html/menu/menu.abstract';
import { TypeMenuProps } from '../../../../core/components/type-html/menu/menu.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IMenu } from './menu.interface';

export class Menu extends TypeMenu implements IMenu {
  className: 'Menu';

  override isBasic = true;

  constructor(params: TypeMenuProps = {}) {
    super();
    this.className = 'Menu';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
