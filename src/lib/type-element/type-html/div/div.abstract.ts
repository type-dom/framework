import { TypeHtml } from '../type-html.abstract';
import type { ITypeDiv } from './div.interface';

export abstract class TypeDiv extends TypeHtml implements ITypeDiv {
  nodeName: 'div';
  dom: HTMLDivElement;

  protected constructor() {
    super();
    this.nodeName = 'div';
    this.dom = document.createElement(this.nodeName);
  }
}
