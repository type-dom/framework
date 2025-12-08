import { TypeHeader } from '../../../../core/components/type-html/header/header.abstract';
import { HeaderProps } from '../../../../core/components/type-html/header/header.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IHeader } from './header.interface';

export class Header extends TypeHeader implements IHeader {
  className: 'Header';

  override isBasic = true;

  constructor(params: HeaderProps = {}) {
    super(params);
    this.className = 'Header';
    transformSlot(this, params.slot);
  }
}
