import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeMenuItem } from '../../../type-element/type-html/menu-item/menu-item.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IMenuItem } from './menu-item.interface';
export class MenuItem extends TypeMenuItem implements IMenuItem {
  className: 'MenuItem';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'MenuItem';
  }
}
