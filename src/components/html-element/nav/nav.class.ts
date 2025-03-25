import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeNav } from '../../../core/type-html/nav/nav.abstract';
import type { INav } from './nav.interface';

export class Nav extends TypeNav implements INav {
  className: 'Nav';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Nav';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
