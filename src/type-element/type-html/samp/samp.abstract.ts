import { TypeHtml } from '../type-html.abstract';
import type { ITypeSamp } from './samp.interface';
export abstract class TypeSamp extends TypeHtml implements ITypeSamp {
  nodeName: 'samp';
  dom: HTMLElement;
  protected constructor() {
    super();
    this.nodeName = 'samp';
    this.dom = document.createElement(this.nodeName);
  }
}
