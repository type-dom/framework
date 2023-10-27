import { TypeHtml } from '../type-html.abstract';
import { ITypeDfn } from './dfn.interface';
export abstract class TypeDfn extends TypeHtml implements ITypeDfn {
  nodeName: 'dfn';
  dom: HTMLElement;
  protected constructor() {
    super();
    this.nodeName = 'dfn';
    this.dom = document.createElement(this.nodeName);
  }
}
