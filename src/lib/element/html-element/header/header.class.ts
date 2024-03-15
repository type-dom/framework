import { ITypeConfig } from '../../../config.interface';
import { TypeHeader } from '../../../type-element/type-html/header/header.abstract';
import type { IHeader } from './header.interface';

export class Header extends TypeHeader implements IHeader {
  className: 'Header';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.nodeName = 'header';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Header';
    this.setConfig(config);
  }
}
