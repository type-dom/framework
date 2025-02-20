import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeMenu } from '../../../core/type-html/menu/menu.abstract';
import type { IMenu } from './menu.interface';

export class Menu extends TypeMenu implements IMenu {
  className: 'Menu';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Menu';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
