import { TypeNav } from '../../../../core/components/type-html/nav/nav.abstract';
import { TypeNavProps } from '../../../../core/components/type-html/nav/nav.interface';
import type { INav } from './nav.interface';

export class Nav extends TypeNav implements INav {
  className: 'Nav';

  override isBasic = true;

  constructor(params: TypeNavProps = {}) {
    super();
    this.className = 'Nav';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
