import { TypeHtml } from '../type-html.abstract';
import type { ITypeSub } from './sub.interface';

export abstract class TypeSub extends TypeHtml implements ITypeSub {
  nodeName: 'sub';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'sub';
    this.dom = document.createElement(this.nodeName);
  }
}
