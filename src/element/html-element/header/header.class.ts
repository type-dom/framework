import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeHeader } from '../../../type-element/type-html/header/header.abstract';
import { IHeader } from './header.interface';
import {XElement} from "../../../x-element/x-element.class";
export class Header extends TypeHeader implements IHeader {
  className: 'Header';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.nodeName = 'header';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Header';
  }
}
