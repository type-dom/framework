import { TypeNav } from '../../../../core/components/type-html/nav/nav.abstract';
import { NavProps } from '../../../../core/components/type-html/nav/nav.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { INav } from './nav.interface';

export class Nav extends TypeNav implements INav {
  className: 'Nav';

  override isBasic = true;

  constructor(params: NavProps = {}) {
    super(params);
    this.className = 'Nav';
    transformSlot(this, params.slot);
  }
}
