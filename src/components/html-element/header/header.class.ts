import { TypeHeader } from '../../../core/type-html/header/header.abstract';
import { TypeHeaderProps } from '../../../core/type-html/header/header.interface';
import type { IHeader } from './header.interface';

export class Header extends TypeHeader implements IHeader {
  className: 'Header';

  override isBasic = true;

  constructor(params: TypeHeaderProps = {}) {
    super();
    this.className = 'Header';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
