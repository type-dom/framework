import { TypeHtml } from '../type-html.abstract';
import type { ITypeFooter } from './footer.interface';
export abstract class TypeFooter extends TypeHtml implements ITypeFooter {
  nodeName: 'footer';
  dom: HTMLElement;
  protected constructor() {
    super();
    this.nodeName = 'footer';
    this.dom = document.createElement(this.nodeName);
  }
}
