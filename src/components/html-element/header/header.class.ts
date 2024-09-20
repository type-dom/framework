import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeHeader } from '../../../core/type-html/header/header.abstract';
import type { IHeader } from './header.interface';

export class Header extends TypeHeader implements IHeader {
  className: 'Header';

  constructor(params?: ITypeConfig) {
    super();
    this.nodeName = 'header';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Header';
    this.useParams(params);
  }
}
