import { TypeHtml } from '../type-html.abstract';
import type { ITypeMenu } from './menu.interface';

export abstract class TypeMenu extends TypeHtml implements ITypeMenu {
  nodeName: 'menu';
  dom: HTMLMenuElement;

  protected constructor() {
    super();
    this.nodeName = 'menu';
    this.dom = document.createElement(this.nodeName);
  }
}
