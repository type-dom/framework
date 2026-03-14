import { TypeHeader } from '../../../../core/abstracts/type-html/header/header.abstract';
import { HeaderProps } from '../../../../core/abstracts/type-html/header/header.interface';
import type { IHeader } from './header.interface';

export class Header extends TypeHeader implements IHeader {
  className: 'Header';
  constructor(params: HeaderProps = {}) {
    super(params);
    this.className = 'Header';
  }
}
