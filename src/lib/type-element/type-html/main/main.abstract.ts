import { TypeHtml } from '../type-html.abstract';
import type { ITypeMain } from './main.interface';

export abstract class TypeMain extends TypeHtml implements ITypeMain {
  nodeName: 'main';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'main';
    this.dom = document.createElement(this.nodeName);
  }
}
