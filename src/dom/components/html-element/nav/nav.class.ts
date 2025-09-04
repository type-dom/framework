import { TypeNav } from '../../../../core/components/type-html/nav/nav.abstract';
import { TypeNavProps } from '../../../../core/components/type-html/nav/nav.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { INav } from './nav.interface';

export class Nav extends TypeNav implements INav {
  className: 'Nav';

  override isBasic = true;

  constructor(params: TypeNavProps = {}) {
    super();
    this.className = 'Nav';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
