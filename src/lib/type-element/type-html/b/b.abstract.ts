import { TypeHtml } from '../type-html.abstract';
import type { ITypeB } from './b.interface';

export abstract class TypeB extends TypeHtml implements ITypeB {
  nodeName: 'b';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'b';
    this.dom = document.createElement(this.nodeName);
  }
}
