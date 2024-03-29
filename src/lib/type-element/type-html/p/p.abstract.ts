import { TypeHtml } from '../type-html.abstract';
import type { ITypeP } from './p.interface';

export abstract class TypeP extends TypeHtml implements ITypeP {
  nodeName: 'p';
  dom: HTMLParagraphElement;

  protected constructor() {
    super();
    this.nodeName = 'p';
    this.dom = document.createElement(this.nodeName);
  }
}
