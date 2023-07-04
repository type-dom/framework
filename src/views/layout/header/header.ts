import { Display } from '../../../../type-dom/style/style.enum';
import { TypeHeader } from '../../../../type-dom/type-element/type-html/header/header.abstract';
import { LayoutWrapper } from '../layout';
import { Navbar } from './navbar/navbar';
// import { Logo } from './logo/logo';

export class HeaderWrapper extends TypeHeader {
  className: 'HeaderWrapper';
  childNodes: [Navbar];
  constructor(public parent: LayoutWrapper) {
    super();
    this.className = 'HeaderWrapper';
    this.addStyleObj({
      height: '60px',
      display: Display.flex,
      justifyContent: 'flex-start',
      // paddingLeft: '10px',
    });
    this.addAttrName('layout-header');
    // const logo = new Logo(this);
    const navbar = new Navbar(this);
    this.childNodes = [navbar];
  }
}
