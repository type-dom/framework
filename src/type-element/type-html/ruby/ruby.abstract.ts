import { TypeHtml } from '../type-html.abstract';
import type { ITypeRuby } from './ruby.interface';
export abstract class TypeRuby extends TypeHtml implements ITypeRuby {
  nodeName: 'ruby';
  dom: HTMLElement;
  protected constructor() {
    super();
    this.nodeName = 'ruby';
    this.dom = document.createElement(this.nodeName);
  }
}
