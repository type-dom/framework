import { TypeHtml } from '../type-html.abstract';
import type { ITypeBr } from './br.interface';
export abstract class TypeBr extends TypeHtml implements ITypeBr {
  nodeName: 'br';
  dom: HTMLBRElement;
  protected constructor() {
    super();
    this.nodeName = 'br';
    this.dom = document.createElement(this.nodeName);
  }
}
