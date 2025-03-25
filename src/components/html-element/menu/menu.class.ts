import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeMenu } from '../../../core/type-html/menu/menu.abstract';
import type { IMenu } from './menu.interface';

export class Menu extends TypeMenu implements IMenu {
  className: 'Menu';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Menu';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
