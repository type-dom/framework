import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeHeader } from '../../../type-element/type-html/header/header.abstract';
import type { IHeader } from './header.interface';

export class Header extends TypeHeader implements IHeader {
  className: 'Header';

  constructor(public parent?: TypeHtml) {
    super();
    this.nodeName = 'header';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Header';
  }
}
