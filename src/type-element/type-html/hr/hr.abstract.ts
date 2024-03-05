import { TypeHtml } from '../type-html.abstract';
import type { ITypeHr } from './hr.interface';

export abstract class TypeHr extends TypeHtml implements ITypeHr {
  nodeName: 'hr';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'hr';
    this.dom = document.createElement(this.nodeName);
  }
}
