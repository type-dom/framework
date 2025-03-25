import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeHeader } from '../../../core/type-html/header/header.abstract';
import type { IHeader } from './header.interface';

export class Header extends TypeHeader implements IHeader {
  className: 'Header';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Header';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
