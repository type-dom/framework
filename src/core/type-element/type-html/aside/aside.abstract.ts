import { TypeHtml } from '../type-html.abstract';
import type { ITypeAside } from './aside.interface';

export abstract class TypeAside extends TypeHtml implements ITypeAside {
  nodeName: 'aside';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'aside';
    this.dom = document.createElement(this.nodeName);
  }
}
