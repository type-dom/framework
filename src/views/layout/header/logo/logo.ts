import { TypeDiv } from '../../../../../type-dom/type-element/type-html/div/div.abstract';
import { TypeSvg } from '../../../../../type-dom/type-element/type-svg/type-svg.abstract';
import { LogoSvg } from '../../../../../type-dom/components/svgs/logo/logo';
import { HeaderWrapper } from '../header';
export class Logo extends TypeDiv {
  className: 'Logo';
  childNodes: TypeSvg[];
  constructor(public parent: HeaderWrapper) {
    super();
    this.className = 'Logo';
    this.addAttrName('header-logo');
    const logoSvg = new LogoSvg(this);
    logoSvg.resetSize(58, 58);
    this.childNodes = [logoSvg];
  }
}
