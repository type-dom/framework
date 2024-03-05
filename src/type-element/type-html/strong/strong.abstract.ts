import { TypeHtml } from '../type-html.abstract';
import type { ITypeStrong } from './strong.interface';

export abstract class TypeStrong extends TypeHtml implements ITypeStrong {
  nodeName: 'strong';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'strong';
    this.dom = document.createElement(this.nodeName);
  }
}
